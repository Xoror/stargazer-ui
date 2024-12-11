import { forwardRef, useState, useEffect, useLayoutEffect, useRef, useMemo, createContext, useContext } from "react"
import { FormSelectType, FormSelectControlType, FormSelectInputType, FormSelectListType, FormSelectOptionType, SelectContextType } from "./Form.types"

import Overlay from "../Overlay"

import { useFormContext, useFormTagContext, ErrorMessage, HintMessage } from "./Form"
import mergeRefs from "../utils/MergeRefs"
import mergeClassnames from "../utils/MergeClassnames"
import createSyntheticEvent from "../utils/CreateSyntheticEvent"
import { InputKeyType, isValidInputKey } from "../utils/IsInputKey"

export const SelectContext = createContext<SelectContextType | null>(null)
export const SelectContextProvider = ({children, value} : {children: React.ReactNode, value:SelectContextType}) => {
    return (
        <SelectContext.Provider value={value}>
            {children}
        </SelectContext.Provider>
    )
}
export const useSelectContext = () => {
    const context = useContext(SelectContext)
    if(!context) {
        throw new Error("UseSelectContext must be used within a SelectContextProvider!")
    }
    return context
}

const useCustomState = (test: any, middleware?: any):([any, (callback: any, options?: any) => void]) => {
    const [state, setState] = useState(test)
    const customSetState = (callback: any, options: any = {middleware:true}) => {
        let newValue
        if( (typeof callback) === "function") {
            newValue = callback(state)
        } else {
            newValue = callback
        }
        if(middleware && options.middleware === true) middleware(newValue)
        setState(newValue)
    }
    return [state, customSetState]
}

const inputKeys: InputKeyType[] = [
    {
        id: "ArrowDown",
        alt: true
    },
    {
        id: "ArrowUp",
        alt: true
    },
    { id: "Home" }, { id: "End" }, { id: "Enter" }, { id: "Escape" }, 
    { id: "PageDown" }, { id: "PageUp" }, { id: " " }, { id: "Tab" }
]


const Select = forwardRef<HTMLButtonElement, FormSelectType>( ({
        children, className, id, required=false, disabled=false, value, ref: ref2,
        errorAsOverlay, error, hint, "aria-describedby":ariaDescribedby,
        onClick, onBlur, onKeyUp, onKeyDown, onChange,
        ...restProps
    }, ref) => {
    const { noValidate } = useFormTagContext()
    const { controlId, isInputGroup, isFLoatingLabel } = useFormContext()
    const isOverlay = isInputGroup || isFLoatingLabel || errorAsOverlay
    const computedClassName = mergeClassnames(
        "sg-form-select", className, error ? "invalid":"", disabled ? "disabled":""
    )

    let elementId = controlId ?? id
    if(elementId === undefined) {
        throw new Error(
            "Form.Select needs to have an id, either provided directly through the 'id' property or wrapped in a Form.Group with a 'controlId' !"
        )
    }
    const hasValidChildren = useMemo(() => {
        if(!children || !Array.isArray(children)) return false

        let isValid = true
        children.forEach(child => {
            if(child.props.value === undefined || child.props.value === null) {
                isValid = false
            }
        })
        if(children[0].props.value && children[0].props.value != "") {
            console.warn("It is recommended to have the first select option in a 'Form.Select' to be a placeholder like 'Select option...' with a value of an empty string")
        }
        return isValid
    }, [children])
    if(!hasValidChildren || !Array.isArray(children)) {
        throw new Error(
            "Form.Select needs to have 1 or more 'Form.Select.Option' children, each with value attributes!"
        )
    }

    const errorMessageId = error ? elementId+"-error-message":undefined
    const hintMessageId = hint ? elementId+"-hint-message":undefined
    const tooltipMessage = isOverlay && (error || hint) ? 
        <div className="sg-form-control-description tooltip">
            {error? <ErrorMessage id={errorMessageId} message={error.message} /> : null}
            {hint? <HintMessage id={hintMessageId} message={hint.message} /> : null}
        </div> : undefined// "Testing a tooltip with a long message. This messsage is so long it hsould in theory trigger a wrap."

    const describedby = mergeClassnames(ariaDescribedby, errorMessageId, hintMessageId)

    const internalSelectControlRef = useRef<HTMLButtonElement>(null)
    const [ showList, setShowList ] = useState<boolean>(false)

    const initialValue = value ? 
        {
            value: value,
            label: children.find(child => child.props.value === value).children ?? "no label found"
        }:
        {
            value: children[0].props.value ?? "",
            label: children[0].props.children ?? "no label found"
        }
    const handleChange = (newValue: any) => {
        if(!internalSelectControlRef.current) return
        
        const target = internalSelectControlRef.current
        target.value = newValue.value;
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', { writable: false, value: target })
        const syntheticEvent = createSyntheticEvent(event) as React.ChangeEvent<typeof target>;
        if(onChange) onChange(syntheticEvent);
    }
    const [ activeDescendant, setActiveDescendant ] = useState<any>(initialValue.value)
    const [ selectedDescendant, setSelectedDescendant ] = useCustomState(initialValue, handleChange)
    const [ inputValue, setInputValue ] = useState<string>("")

    if(value && value !== selectedDescendant.value) {
        const computedLabel = children.find(child => child.props.value === value).props.children ?? "no label found"
        
        setSelectedDescendant({
            value: value,
            label: computedLabel
        }, {middleware: false})
    }

    const resetFocus = () => {
       setActiveDescendant(selectedDescendant.value)
    }
    const handleSetShowList = (show: boolean | ((show:boolean) => boolean)) => {
        if(!showList) {
            resetFocus()
        }
        setShowList(show)
    }

    const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
        handleSetShowList(prev => !prev)
        /*
        if(!showList) {
            const firstChildValue = children[0].props.value ?? ""
            console.log(firstChildValue)
            setActiveDescendant(firstChildValue)
        }
        */
        if(onClick && event) onClick(event)
    }
    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
        handleSetShowList(false)
        if(onBlur) onBlur(event)
    }

    const changeActiveDescendant = (number: number, type: string) => {
        const maxIndex = children.length - 1
        const minIndex = 0
        const currentIndex = children.indexOf(children.find(child => child.props.value === activeDescendant))
        let newIndex, temp
        switch (type) {
            case "add":
                temp = currentIndex + number
                newIndex = temp > maxIndex ? maxIndex : temp
                break
            case "sub":
                temp = currentIndex - number
                newIndex = temp < minIndex ? minIndex : temp
                break
            case "set":
                newIndex = number > maxIndex ? maxIndex : (number < minIndex ? 0 : number)
                break
            default:
                newIndex = 0
                break
        }
        setActiveDescendant(children[newIndex].props.value)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const isInputKey = isValidInputKey(event, inputKeys)
        if(onKeyDown) onKeyDown(event)
        if(!isInputKey) return

        let isPreventDefault = true
        let isStopPropagation = true
    
        switch (event.key) {
            case "ArrowDown":
                if(showList) changeActiveDescendant(1, "add")
                break
            case "ArrowUp":
                if(showList) changeActiveDescendant(1, "sub")
                break
            case "Tab":
                if(!showList) {
                    isPreventDefault = false
                    isStopPropagation = false
                }
        }
        if(isPreventDefault) event.preventDefault()
        if(isStopPropagation) event.stopPropagation()
    }
    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        const isInputKey = isValidInputKey(event, inputKeys)
        if(onKeyUp) onKeyUp(event)
        if(!isInputKey) return

        let isPreventDefault = true
        let isStopPropagation = true
        switch(event.key) {
            case "ArrowDown":
                if(!showList) {
                    handleSetShowList(true)
                }
                break
            case "ArrowUp":
                if(!showList) {
                    handleSetShowList(true)
                    changeActiveDescendant(0, "set")
                }
                break
            case "Home":
                if(!showList) {
                    handleSetShowList(true)
                }
                changeActiveDescendant(0, "set")
                break
            case "End":
                if(!showList) {
                    handleSetShowList(true)
                }
                changeActiveDescendant(children.length - 1, "set")
                break
            case "Enter":
            case " ":
                handleClick()
                if(showList) {
                    const focusElement = document.getElementById(elementId+"-list-item-"+activeDescendant)
                    focusElement?.click()
                }
                break
            case "Escape":
                if(showList) {
                    handleSetShowList(false)
                }
                break
            case "PageDown":
                changeActiveDescendant(10, "add")
                break
            case "PageUp":
                changeActiveDescendant(10, "sub")
                break
            case "Tab":
                if(showList) {
                    handleClick()
                    const focusElement = document.getElementById(elementId+"-list-item-"+activeDescendant)
                    focusElement?.click()
                }
                isPreventDefault = false
                isStopPropagation = false
                break
        }
        if(event.key === "Tab") console.log(isPreventDefault)
        if(isPreventDefault) event.preventDefault()
        if(isStopPropagation) event.stopPropagation()
    }

    const context = useMemo(() => ({
        internalId: elementId,
        showList,
        setShowList: handleSetShowList,
        activeDescendant,
        setActiveDescendant,
        inputValue,
        setInputValue,
        selectedDescendant,
        setSelectedDescendant,
        children
    }), [elementId, showList, activeDescendant, inputValue ])
    
    return (
        <SelectContextProvider value={context}>
            <Overlay trigger={"focus"} position="top" tooltip={tooltipMessage}>
                <SelectControl 
                    value={selectedDescendant.value} label={selectedDescendant.label} ref={mergeRefs([ref, internalSelectControlRef])} 
                    className={computedClassName} id={elementId} required={(required && !noValidate) ?? undefined}  disabled={disabled}
                    aria-required={required ?? undefined} aria-invalid={error ? "true":"false"} aria-describedby={describedby != "" ? describedby : undefined}
                    onClick={handleClick} onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}
                    {...restProps}
                >
                    <SelectList>
                        {children}
                    </SelectList>
                </SelectControl>
            </Overlay>
            <div className="sg-form-control-description">
                {error && !isOverlay ? 
                    <ErrorMessage id={elementId} message={error.message} style={error.style} className={error.className}/>
                    : null }
                {hint && !isOverlay ?
                    <HintMessage id={elementId} message={hint.message} style={hint.style} className={hint.className}/>
                    : null }
            </div>
        </SelectContextProvider>
    )
})
Select.displayName = "FormSelect"

const SelectInput = forwardRef<HTMLInputElement, FormSelectInputType>( ({className, id, value, onChange, ...restProps}, ref ) => {
    const { showList, setShowList, inputValue, setInputValue, internalId } = useSelectContext()

    const debouncedInput = (value: string) => {
        setTimeout(()=>{
            setInputValue(value)
         }, 300)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event)
        if(!showList) { setShowList(true) }
        if(onChange) { onChange(event) }
        //debouncedInput(event.target.value)
        setInputValue(event.target.value)
    }
    const handleKeyUp = (event: React.KeyboardEvent) => {
        const key = event.key
        switch(key) {
            case "ArrowDown":
                console.log("down arrow")
                break
            case "ArrowUp":
                console.log("up arrow")
                break
        }
    }


    return (
        <input value={inputValue} ref={ref}
            onKeyUp={handleKeyUp} onChange={handleChange}
            className={mergeClassnames("sg-select-input", className)} 
            {...restProps}
        />
    )
})
SelectInput.displayName = "FormSelectInput"

const SelectControl = forwardRef<HTMLButtonElement, FormSelectControlType>( ({children, className, value, label, searchable=false, required=false, onChange, ...restProps}, ref) => {
    const { activeDescendant, showList, internalId } = useSelectContext()
    const internalButtonRef = useRef(null)
    
    const computedClassName = mergeClassnames(className, "sg-select-control")

    return (
        <button 
            role="combobox" aria-controls={internalId+"list"} aria-expanded={showList} aria-activedescendant={activeDescendant === false ? "":internalId+"-list-item-"+activeDescendant}
            ref={mergeRefs([ref, internalButtonRef])} value={value} type="button" 
            className={computedClassName} id={internalId+"-control"}
            {...restProps}
        >
            <span>{label}</span>
            {children}
        </button>
    )
})
SelectControl.displayName = "FormSelectControl"
/*
const SelectControlAlternate = forwardRef<HTMLDivElement, FormSelectControlType>( ({children, className, placeholder="Placeholder...", searchable=false, inputRef, inputOptions, ...restProps}, ref) => {
    const { setShowList, internalId } = useSelectContext()
    const selectControlRef = useRef<HTMLDivElement>(null)    

    const handlePointerUp = (event: React.MouseEvent) => {
        setShowList(prev => !prev);
        const selectControl = selectControlRef.current
        if(selectControl) {
            selectControl.classList.add("focus")
            const eventTargetChildren = selectControl.children[0] as HTMLElement
            if(eventTargetChildren) { eventTargetChildren.focus() }
        }
    }
    const inputParams = {...inputOptions, disabled:searchable, placeholder:placeholder, ref:inputRef}
    
    return (
        <div ref={mergeRefs([ref, selectControlRef])} onPointerUp={handlePointerUp} className={mergeClassnames("sg-select-control", className)} {...restProps}>
            <SelectInput {...inputParams}/>
        </div>
    )
})
SelectControl.displayName = "FormSelectControl"
*/ 

const SelectList = forwardRef<HTMLUListElement, FormSelectListType>( ({children, className, id, ...restProps}, ref) => {
    const { showList, internalId } = useSelectContext()

    const listRef = useRef<HTMLUListElement>(null)
    
    return (
        <ul role="listbox"
            ref={mergeRefs([ref, listRef])} id={internalId+"-list"}
            className={mergeClassnames("sg-select-list", className)} style={showList ? undefined : {display:"none"}} 
            {...restProps}>
            {children}
        </ul>
    )
})
SelectList.displayName = "FormSelectList"

const SelectOption = forwardRef<HTMLLIElement, FormSelectOptionType>(({
        children, className, id, value, disabled, label, selected,
        onPointerDown, onPointerOver, onClick, ...restProps
    }, ref) => {
    const { internalId, activeDescendant, setActiveDescendant, selectedDescendant, setSelectedDescendant, setShowList } = useSelectContext()
    const handlePointerEnter = (event: React.PointerEvent<HTMLLIElement>) => {
        if(!event.target) return
        setActiveDescendant(value)
        if(onPointerOver) onPointerOver(event)
    }
    const handleCLick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation()

        setSelectedDescendant( (prev:any) => ({
            value: value,
            label: children
        }))
        setShowList(false)

        if(onClick) onClick(event)
    }
    
    const computedClassName = mergeClassnames("sg-select-list-item", className, activeDescendant === value ? "focus":"")
    return (
        <li role="option" aria-selected={selectedDescendant.value === value ? true:false}
            ref={ref} id={internalId+"-list-item-"+value} className={computedClassName}
            onPointerOver={handlePointerEnter} onClick={handleCLick}
            {...restProps}
        >
            {children}
        </li>
    )
})
SelectOption.displayName = "FormSelectOption"

export default Object.assign(Select, {
    Control: SelectControl,
    Input: SelectInput,
    Options: SelectList,
    Option: SelectOption
})