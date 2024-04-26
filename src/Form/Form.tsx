import React, { forwardRef, useContext, createContext, useMemo, useState, useRef, useEffect } from "react";

import { FormCheckType, FormContextType, FormControlType, FormGroupType, FormLabelType, FormTextType, FormType, FormSelectType, FormSelectControlType, FormSelectInputType, FormSelectListType, FormSelectListItemType, SelectContextType } from "./Form.types";
import useClassname from "../hooks/useClassname";
import mergeRefs from "../utils/MergeRefs";

export const FormContext = createContext<FormContextType | null>(null)
export const FormContextProvider = ({children, value} : {children: React.ReactNode, value:FormContextType}) => {
    return (
        <FormContext.Provider value={value}>
            {children}
        </FormContext.Provider>
    )
}
export const useFormContext = () => {
    const context = useContext(FormContext)
    if(!context) {
        return { controlId: null}
    }
    return context
}


const Form = forwardRef<HTMLFormElement, FormType>(({children, ...restProps}, ref) => {
    return (
        <form ref={ref} {...restProps}>
            {children}
        </form>
    )
})


const Control = forwardRef<HTMLInputElement, FormControlType>( (
        {as = "input", className = "", plaintext = false, id="", type = "text", autoFocus=false, ...restProps}, ref
) => {
    let Component = as

    const { controlId } = useFormContext()

    let elementId = controlId ?? id

    let computedClassName = (plaintext ? "sg-form-control-plaintext" : "sg-form-control") + (className != "" ? " "+className : "") + (type == "color" ? " sg-form-control-color" : "")

    return (
        <Component autoFocus={autoFocus} ref={ref} id={elementId} type={type} className={computedClassName} {...restProps} />
    )
})

/*
<select ref={ref} className={`sg-form-select${className ? " "+className : ""}`} id={elementId} {...restProps}>
    {children}
</select>
*/

const Group = forwardRef<HTMLDivElement, FormGroupType>( ({children, className, controlId, ...restProps}, ref) => {
    const context = useMemo(() => {
        return {controlId: controlId}
    }, [controlId])
    return (
        <div ref={ref} className={`sg-from-group${className ? " "+className : ""}`} {...restProps}>
            <FormContextProvider value={context}>
                {children}
            </FormContextProvider>
        </div>
    )
})

 
const Label = forwardRef<HTMLLabelElement, FormLabelType>( ({children, className, htmlFor}, ref) => {
    const { controlId } = useFormContext()

    let elementHtmlFor = controlId ?? htmlFor
    return (
        <label ref={ref} htmlFor={elementHtmlFor} className={`sg-form-label${className ? " "+className : ""}`}>
            {children}
        </label>
    )
})

// <Form.Check className="mb-3" type="checkbox" id="remember me checkbox" label="Remember me" onChange={event => handleChange(event, "remember")}/>
const Check = forwardRef<HTMLInputElement, FormCheckType>( ({ 
        classNameContainer, containerRef, containerId, style,
        classNameLabel, labelRef, label, labelId,
        className, type, id, reverse=false, checkStyle, ...restProps 
    } , ref) => {
    
        const { controlId } = useFormContext()

    const elementId = controlId ?? id
    const typeComputed = type === "switch" ? "checkbox" :  type

    return (
        <div ref={containerRef} id={containerId} style={style} className={`sg-form-check${reverse ? "-reverse":""}${classNameContainer ? " "+classNameContainer : ""}${type === "switch" ? " sg-form-switch":""}`}>
            {reverse ?
                <>
                    <input ref={ref} type={typeComputed} id={elementId} className={`sg-form-check-input${className ? " "+className : ""}`} {...restProps} />
                    <label ref={labelRef} id={labelId} htmlFor={elementId}className={`sg-form-check-label${classNameLabel ? " "+classNameLabel : ""}`}>{label}</label>
                </> :
                <>
                    <label ref={labelRef} id={labelId} htmlFor={elementId}className={`sg-form-check-label${classNameLabel ? " "+classNameLabel : ""}`}>{label}</label>
                    <input ref={ref} type={typeComputed} id={elementId} className={`sg-form-check-input${className ? " "+className : ""}`} style={checkStyle} {...restProps} />
                </>
            }
        </div>
    )
})

const Text = forwardRef<HTMLElement, FormTextType>( ({children, className, ...restProps}, ref) => {
    return (
        <small ref={ref} className={`sg-form-text${className ? " "+className:""}`} {...restProps}>
            {children}
        </small>
    )
})


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

const Select = forwardRef<HTMLDivElement, FormSelectType>( ({children, className, id, ...restProps}, ref) => {
    const { controlId } = useFormContext()

    const internalSelectRef = useRef<HTMLDivElement>(null)

    const [ showList, setShowList ] = useState<boolean>(false)
    const [ activeDescendant, setActiveDescendant ] = useState<string>("")
    const [ inputValue, setInputValue ] = useState<string>("")

    let elementId = controlId ?? id

    const context = useMemo(() => ({
        showList,
        setShowList,
        activeDescendant,
        setActiveDescendant,
        inputValue,
        setInputValue
    }), [showList, activeDescendant, inputValue])

    useEffect(() => {
        const selectElement = internalSelectRef.current
        if(selectElement) {
            const handleClick = (event: MouseEvent) => {
                if(!selectElement.contains(event.target as HTMLElement)) {
                    setShowList(false)
                    document.querySelectorAll(".sg-select-control.focus").forEach(element => {
                        element.classList.remove("focus")
                    })
                }
            }
            document.addEventListener("click", handleClick, true)
            return function cleanup() {
                document.removeEventListener("click", handleClick, true)
            }
        }
    }, [internalSelectRef.current])

    return (
        <div ref={mergeRefs([ref, internalSelectRef])} className={`sg-form-select${className ? " "+className : ""}`} id={elementId} {...restProps} >
            <SelectContextProvider value={context}>
                {children}
            </SelectContextProvider>
        </div>
    )
})
const SelectControl = forwardRef<HTMLDivElement, FormSelectControlType>( ({children, className, placeholder="Placeholder...", searchable=false, inputRef, inputOptions, ...restProps}, ref) => {
    const { setShowList } = useSelectContext()
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
        <div ref={mergeRefs([ref, selectControlRef])} onPointerUp={handlePointerUp} className={useClassname("sg-select-control", className)} {...restProps}>
            <SelectInput {...inputParams}/>
        </div>
    )
})
const SelectInput = forwardRef<HTMLInputElement, FormSelectInputType>( ({className, id, value, onChange, ...restProps}, ref ) => {
    const { showList, setShowList, inputValue, setInputValue } = useSelectContext()

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
            className={useClassname("sg-select-input", className)} 
            {...restProps}
        />
    )
})
const SelectList = forwardRef<HTMLUListElement, FormSelectListType>( ({children, className, id, ...restProps}, ref) => {
    const { showList } = useSelectContext()

    const listRef = useRef<HTMLUListElement>(null)
    
    return (
        <ul ref={mergeRefs([ref, listRef])} className={useClassname("sg-select-list", className)} style={showList ? undefined : {display:"none"}} {...restProps}>
            {children}
        </ul>
    )
})
const SelectListItem = forwardRef<HTMLLIElement, FormSelectListItemType>(({children, className, id, value,...restProps}, ref) => {
    
    const handlePointerEnter = (event: React.MouseEvent) => {
        if(!event.target) return

        let element = event.target as HTMLElement
        let focusElement = document.querySelectorAll(".sg-select-list-item.focus")
        //console.log(element, focusElement)
        focusElement.forEach(element => element.classList.remove("focus"))
        element.classList.add("focus")
    }
    const handlePointerUp = (event: React.MouseEvent) => {
        console.log((event.target as HTMLElement).id)
    }
    return (
        <li onPointerDown={handlePointerUp} onPointerOver={handlePointerEnter} id={value ?? id} className={useClassname("sg-select-list-item", className)} {...restProps}>
            {children}
        </li>
    )
})



export default  Object.assign(Form, {
    Control: Control,
    Select: Object.assign(Select, {
        Control: SelectControl,
        Input: SelectInput,
        Options: SelectList,
        Option: SelectListItem
    }),
    Group: Group,
    Label: Label,
    Check: Check,
    Text: Text
})