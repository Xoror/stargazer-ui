import React, { forwardRef, useContext, createContext, useMemo } from "react";

import { FormCheckType, FormContextType, FormControlType, FormGroupType, FormLabelType, FormSelectType, FormTextType, FormType } from "./Form.types";

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


const Select = forwardRef<HTMLSelectElement, FormSelectType>( ({children, className, id, ...restProps}, ref) => {
    const { controlId } = useFormContext()

    let elementId = controlId ?? id

    return (
        <select ref={ref} className={`sg-form-select${className ? " "+className : ""}`} id={elementId} {...restProps}>
            {children}
        </select>
    )
})


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

export default  Object.assign(Form, {
    Control: Control,
    Select: Select,
    Group: Group,
    Label: Label,
    Check: Check,
    Text: Text
})