import { forwardRef, useState, useEffect, useLayoutEffect, useRef, useMemo, createContext, useContext, useCallback } from "react"
import { FormSelectType, FormSelectControlType, FormSelectInputType, FormSelectListType, FormSelectOptionType, SelectContextType } from "./Form.types"

import Overlay from "../Overlay"

import { useFormContext, useFormTagContext, ErrorMessage, HintMessage } from "./Form"
import mergeRefs from "../utils/MergeRefs"
import mergeClassnames from "../utils/MergeClassnames"
import createSyntheticEvent from "../utils/CreateSyntheticEvent"
import { InputKeyType, isValidInputKey } from "../utils/IsInputKey"
import createFastContext from "../utils/createFastContext"

/*
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
    */

const {Provider: SelectContextProvider, setStore, getStore: getSelectContext, checkContext} = createFastContext<SelectContextType<{label:any, value:any}>>()

type CustomStateMiddleware<T> = (newValue: T) => void
type CustomSetStateSelector<T> = (oldValue: T) => T | T
type CustomSetStateOptions = { middleware: true }
export type CustomSetState<T> = (callback: CustomSetStateSelector<T>, options?: CustomSetStateOptions) => void
type CustomStateReturn<T> = [T, CustomSetState<T>]
const useCustomState = <T, >(initialValue: T, middleware?: CustomStateMiddleware<T>) : CustomStateReturn<T> => {
    const [state, setState] = useState(initialValue)
    const customSetState = (callback: CustomSetStateSelector<T>, options: CustomSetStateOptions = { middleware:true }) => {
        let newValue: T
        if( typeof callback === "function") {
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
        children, className, id, required=false, disabled=false, value, defaultValue, label,
        errorAsOverlay, error, hint, "aria-describedby":ariaDescribedby, loading=false, listProps,
        onChange,
        ...restProps
    }, ref) => {

    if(Array.isArray(children)) {
        children = children.flat(Infinity).filter(child => child !== null && child !== undefined)
    } else {
        children = [children].filter(child => child !== null && child !== undefined)
    }
    
    const internalButtonRef = useRef<HTMLButtonElement>(null)
    const { noValidate } = useFormTagContext()
    const { controlId, isInputGroup, isFLoatingLabel } = useFormContext()
    
    const isOverlay = isInputGroup || isFLoatingLabel || errorAsOverlay
    const computedClassName = mergeClassnames(
        "sg-form-select", className, error ? "invalid":"", disabled ? "disabled":""
    )

    const elementId = controlId ?? id
    if(elementId === undefined) {
        throw new Error(
            "Form.Select needs to have an id, either provided directly through the 'id' property or wrapped in a Form.Group with a 'controlId' !"
        )
    }
    
    const hasValidChildren = useMemo(() => {
        if(!children || !Array.isArray(children)) return false
        if(children.length < 1) return false

        let isValid = true
        children.forEach(child => {
            if(child.props.value === undefined || child.props.value === null) {
                isValid = false
            }
        })
        
        if(children[0].props.value && children[0].props.value != "") {
            //console.warn("It is recommended to have the first select option in a 'Form.Select' to be a placeholder like 'Select option...' with a value of an empty string")
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

    const valueChild = children.find(child => child.props.value === value)
    const defaultValueChild = children.find(child => child.props.value === defaultValue)
    const initialValue = value != undefined && value != null ? 
        {
            value: value,
            label: valueChild ? valueChild.props.children : "no label found"
        }:
        defaultValue != undefined && defaultValue != null ? 
            {
                value: defaultValueChild ? defaultValueChild.props.value : "",
                label: defaultValueChild ? defaultValueChild.props.children : "no label found"
            }
            :
            {
                value: children[0].props.value ?? "",
                label: children[0].props.children ?? "no label found"
            }
    const handleChange = (newValue: any) => {
        if(!internalButtonRef.current) return
        
        const target = internalButtonRef.current
        target.value = newValue.value;
        const event = new Event('change', { bubbles: true });
        Object.defineProperty(event, 'target', { writable: false, value: target })
        const syntheticEvent = createSyntheticEvent(event) as React.ChangeEvent<typeof target>;
        if(onChange) onChange(syntheticEvent);
    }
    const [ selectedDescendant, setSelectedDescendant ] = useState<{value:any, label:any}>(initialValue)// useCustomState<{value:any, label:any}>(initialValue, handleChange)
    const handleSelectedDescendant = (newDescendant: typeof selectedDescendant) => {
        setSelectedDescendant(newDescendant)
        if(onChange) handleChange(newDescendant)
    }
    /*
    if(value != undefined && value != null && value !== selectedDescendant.value && !loading) {
        const isChild = children.find(child => child.props.value === value)
        const isDefaultChild = children.find(child => child.props.value === defaultValue)
        const computedLabel = isChild ? isChild.props.children : (isDefaultChild ? isDefaultChild.props.children : "no label found")
        const computedValue = isChild ? value : (isDefaultChild ? defaultValue : "")
        setSelectedDescendant({
            value: computedValue,
            label: computedLabel
            }, {middleware: false})
            }
    */

    const context = {
        internalId: elementId,
        showList: false,
        activeDescendant: initialValue.value,
        inputValue: "",
        selectedDescendant,
        setSelectedDescendant: handleSelectedDescendant,
        items: children
    }
    
    return (
        <SelectContextProvider initialState={context} refreshKeys={["items", "internalId", "setSelectedDescendant"]}>
            <Overlay trigger={"focus"} position="bottom" tooltip={tooltipMessage}>
                <SelectControl 
                    value={selectedDescendant.value} label={selectedDescendant.label} handleSelectedDescendant={handleSelectedDescendant}
                    className={computedClassName} id={elementId} required={(required && !noValidate) ?? undefined}  disabled={disabled}
                    aria-required={required ?? undefined} aria-invalid={error ? "true":"false"} aria-describedby={describedby != "" ? describedby : undefined}
                    {...restProps} ref={mergeRefs([ref, internalButtonRef])} 
                >
                    <SelectList>
                        {!loading ? 
                            children
                            :
                            <SelectOption disabled={true} key="loading" value="">
                                Loading...
                            </SelectOption>
                        }
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
/*
const SelectInput = forwardRef<HTMLInputElement, FormSelectInputType>( ({className, id, value, onChange, ...restProps}, ref ) => {
    const { showList, setShowList, inputValue, setInputValue, internalId } = useSelectContext()

    const debouncedInput = (value: string) => {
        setTimeout(()=>{
            setInputValue(value)
         }, 300)
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
*/
const SelectControl = forwardRef<HTMLButtonElement, FormSelectControlType>( ({
        children, className, value, label, searchable=false, required=false,
        onClick, onBlur, onKeyUp, onKeyDown, handleSelectedDescendant,
        ...restProps
    }, ref) => {
    const setSelectContext = setStore()
    const [ activeDescendant, selectedDescendant, showList, internalId, items ] = getSelectContext(state => [ state.activeDescendant, state.selectedDescendant, state.showList, state.internalId, state.items ])
    const internalButtonRef = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if(selectedDescendant.value != value) {
            setSelectContext({selectedDescendant:{value, label}})
        }
    }, [value])
    const computedClassName = mergeClassnames(className, "sg-select-control")

    const resetFocus = () => {
        setSelectContext({activeDescendant: selectedDescendant.value})
    }
    const handleSetShowList = (show: boolean | ((show:boolean) => boolean)) => {
        if(!showList) {
            resetFocus()
        }
        if(typeof show === "boolean") setSelectContext({showList: show})
        else setSelectContext({showList: show(showList)})
    }

    const handleClick = (event?: React.MouseEvent<HTMLButtonElement>) => {
        handleSetShowList(prev => !prev)
        if(onClick && event) onClick(event)
    }
    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>, hasOnBlur=true) => {
        handleSetShowList(false)
        if(onBlur && hasOnBlur) onBlur(event)
    }
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
        const select = internalButtonRef.current
        window.addEventListener("pointerdown", event => {
            if(!select?.contains(event.target as HTMLElement)) handleSetShowList(false)
        }, {signal, capture: true})
        window.addEventListener("resize", event => handleSetShowList(false), {signal, capture: true})
        return function cleanup () {
            controller.abort()
        }
    }, [])

    const changeActiveDescendant = (number: number, type: string) => {
        const maxIndex = (items as any).length - 1
        const minIndex = 0
        const currentIndex = (items as any).indexOf((items as any).find((child:any) => child.props.value === activeDescendant))
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
        setSelectContext({activeDescendant: (items as any)[newIndex].props.value})
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
                console.log("arrow down")
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
                changeActiveDescendant((items as any).length - 1, "set")
                break
            case "Enter":
            case " ":
                handleClick()
                if(showList) {
                    const focusElement = document.getElementById(internalId+"-list-item-"+activeDescendant)
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
                    const focusElement = document.getElementById(internalId+"-list-item-"+activeDescendant)
                    focusElement?.click()
                }
                isPreventDefault = false
                isStopPropagation = false
                break
        }
        if(isPreventDefault) event.preventDefault()
        if(isStopPropagation) event.stopPropagation()
    }

    return (
        <button 
            role="combobox" aria-controls={internalId+"list"} aria-expanded={showList} aria-activedescendant={activeDescendant === false ? "":internalId+"-list-item-"+activeDescendant}
            ref={mergeRefs([ref, internalButtonRef])} value={value} type="button" 
            className={computedClassName} id={internalId+"-control"}
            onClick={handleClick} onBlur={handleBlur} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}
            {...restProps}
        >
            <span>{label}</span>
            {children}
        </button>
    )
})
SelectControl.displayName = "FormSelectControl"

const listPositionSetter = (listRef: any) => {
    const listElement = listRef.current
    if(!listElement) return
    const parent = listElement.parentElement
    if(!parent) return
    let position: React.CSSProperties = {}
    const { height: listHeight } = listElement.getBoundingClientRect()
    const { top, bottom} = parent.getBoundingClientRect()
    const { innerHeight } = window

    const isTop = top > listHeight
    const isBottom = innerHeight - bottom > listHeight
    const borderWidth = getComputedStyle(parent).borderBottomWidth
    const coordinate = `calc(100% + ${borderWidth})`
    if(isBottom) {
        position = {top: coordinate, bottom: "unset"}
    } else if (isTop) {
        position = {bottom:coordinate, top: "unset"}
    } else {
        const height = innerHeight - bottom - 2
        position = {top: coordinate, maxHeight: height}
    }
    if(!listElement.children) return
    const listChildren = listElement.children
    const numberChildren = listChildren.length
    const numberOfRenderedChildren = numberChildren > 5 ? 5 : numberChildren
    let renderedListHeight = 0
    for (let i=0; i< numberOfRenderedChildren; i++) {
        renderedListHeight += listChildren[i].getBoundingClientRect().height
    }
    renderedListHeight += 4
    position.height = renderedListHeight ?? "auto"

    return position
}

const SelectList = forwardRef<HTMLUListElement, FormSelectListType>( ({children, className, id, ...restProps}, ref) => {
    //const { showList, internalId } = getSelectContext()
    const [showList, internalId, selectedDescendant] = getSelectContext(state => [state.showList, state.internalId, state.selectedDescendant])
    const [computedStyle, setComputedStyle] = useState<React.CSSProperties>({})

    const listRef = useRef<HTMLUListElement>(null)
    useLayoutEffect(() => {
        if(!showList || !listRef.current) {
            return
        }
        const newPosition = listPositionSetter(listRef)
        setComputedStyle(newPosition!)
        
    }, [showList])
    useEffect(() => {
        if(!showList || !listRef.current) {
            return
        }
    }, [showList])
    useEffect(() => {
        if(!showList || !listRef.current) {
            return
        }
        const observer = new ResizeObserver((entries) => {
            for(const entry of entries) {
                if(entry.target.scrollHeight > entry.target.clientHeight) {
                    const selectedChild = Array.from(entry.target.children).find(child => child.classList.contains("selected"))
                    if(selectedChild) selectedChild.scrollIntoView({block: 'nearest', inline: 'start'})
                }
            }
        })
        observer.observe(listRef.current)
        return function cleanup () {
            if(!showList || !listRef.current) {
                return
            }
            observer.unobserve(listRef.current)
        }
    }, [showList])
    
    return (
        <ul 
            role="listbox" ref={mergeRefs([ref, listRef])} id={internalId+"-list"} 
            className={mergeClassnames("sg-select-list", className)} style={showList ? {...computedStyle} : {display:"none"}} 
            {...restProps}
        >
            {children}
        </ul>
    )
})
SelectList.displayName = "FormSelectList"

const SelectOption = forwardRef<HTMLLIElement, FormSelectOptionType>(({
        children, className, id, value, disabled, label, selected,
        onPointerDown, onPointerOver, onClick, ...restProps
    }, ref) => {
    const setSelectContext = setStore()
    const isActiveDescendant = getSelectContext(state => state.activeDescendant === value)
    const isSelectedDescendant = getSelectContext(state => state.selectedDescendant.value === value)
    const { internalId, setSelectedDescendant } = getSelectContext(state => state, (oldValue, newValue) => {return oldValue.selectedDescendant.value === newValue.selectedDescendant.value})
    
    const handlePointerEnter = (event: React.PointerEvent<HTMLLIElement>) => {
        if(!event.target) return
        setSelectContext!({activeDescendant: value})
        if(onPointerOver) onPointerOver(event)
    }
    const handleCLick = (event: React.MouseEvent<HTMLLIElement>) => {
        event.stopPropagation()
        if(disabled) return
        
        setSelectedDescendant({
            value: value,
            label: children
        })
        setSelectContext!({showList: false})

        if(onClick) onClick(event)
    }
    
    const computedClassName = mergeClassnames("sg-select-list-item", className, isSelectedDescendant ? "selected":"", isActiveDescendant ? "focus":"")
    return (
        <li role="option" aria-selected={isSelectedDescendant}
            ref={ref} id={internalId+"-list-item-"+value} className={computedClassName}
            onPointerOver={handlePointerEnter} onClick={handleCLick}
            {...restProps}
        >
            {children}
            {isSelectedDescendant ? 
                <div className="sg-form-select-check-icon-wrapper" aria-hidden>
                    <svg className="sg-form-select-check-icon" xmlns='http://www.w3.org/2000/svg' width="0.75rem" height="0.75rem" viewBox='0 0 32 32'>
                        <polygon fill="currentColor" 
                            points='11.941,28.877 0,16.935 5.695,11.24 11.941,17.486 26.305,3.123 32,8.818'
                        />
                    </svg>
                </div>
            :null}
        </li>
    )
})
SelectOption.displayName = "FormSelectOption"

export default Object.assign(Select, {
    Control: SelectControl,
    /*Input: SelectInput,*/
    Options: SelectList,
    Option: SelectOption
})