import React, { forwardRef, useContext, createContext, useMemo, useState, useRef, useEffect, InvalidEvent } from "react";

import { HintType, ErrorType, FormTagContextType, FormCheckType, FormContextType, FormControlType, FormGroupType, FormLabelType, FormSliderType, FormTextType, FormType, FormSelectTagType, SliderContextType, WarningIconType } from "./Form.types";
import useClassname from "../hooks/useClassname";
import mergeClassnames from "../utils/MergeClassnames";
import mergeRefs from "../utils/MergeRefs";
import contrastingColor from "../utils/ContrastingColor";

import Overlay from "../Overlay";
import Select from "./FormSelect"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"

const WarningIcon = forwardRef<SVGSVGElement, WarningIconType>( ({className, alt, color, size, ...restProps}, ref) => {
    const sizeComputed = {width: size ?? "1rem", height: size ?? "1rem"}
    const classNameComputed = mergeClassnames("sg-form-control-error-icon", className)

    return (
        <svg 
            ref={ref} className={classNameComputed} color={color ?? "currentColor"} xmlns="http://www.w3.org/2000/svg" 
            width={sizeComputed.width} height={sizeComputed.height} viewBox="0 0 256 256" 
            {...restProps}
        >
            <path
                fill="transparent"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={28}
                d="M128 83v65"
            />
            <circle cx={128} cy={183} r={14} fill="currentColor" />
            <path
                fill="transparent"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={20}
                d="M40 223h176l16-32-79-158h-50L24 191l16 32Z"
            />
        </svg>
    )
})
WarningIcon.displayName = "WarningIcon"

const FormTagContext = createContext<FormTagContextType | null>(null)
const FormTagContextProvider = ({children, value} : {children: React.ReactNode, value:FormTagContextType}) => {
    return(
        <FormTagContext.Provider value={value}>
            {children}
        </FormTagContext.Provider>
    )
}
export const useFormTagContext = () => {
    const context = useContext(FormTagContext)
    if(!context) {
        return { noValidate: null}
    }
    return context
}

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
        return {}
    }
    return context
}


const Form = forwardRef<HTMLFormElement, FormType>(({children, noValidate, ...restProps}, ref) => {
    const context = useMemo(() => {
        return {noValidate: !!noValidate}
    }, [noValidate])
    return (
        <form ref={ref} noValidate={noValidate} {...restProps}>
            <FormTagContextProvider value={context}>
                {children}
            </FormTagContextProvider>
        </form>
    )
})
Form.displayName = "Form"

export const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorType>(({children, className, id, message, ...restProps}, ref) => {

    const classNameComputed = mergeClassnames("sg-form-control-error", className)
    return(
        <p ref={ref} id={id+"-error-message"} className={classNameComputed} {...restProps}>
            <WarningIcon width="1.25em" height="1.25em"  /> 
            <span>{message ?? children}</span>
        </p>
    )
})
ErrorMessage.displayName = "ErrorMessage"
export const HintMessage = forwardRef<HTMLParagraphElement, HintType>(({children, className, id, message, ...restProps}, ref) => {
    const classNameComputed = mergeClassnames("sg-form-control-hint", className)
    return(
        <>
            {message ?
                <p ref={ref} id={id+"-hint-message"} className={classNameComputed} {...restProps}>
                    {message}
                </p>
                : 
                <div ref={ref} id={id} className={classNameComputed} {...restProps}>
                    {children}
                </div>
            }
        </>
    )
})
HintMessage.displayName = "HintMessage"

const Control = forwardRef<HTMLInputElement, FormControlType>( (
        {as = "input", className = "", plaintext = false, id, type = "text", autoFocus=false, error, errorAsOverlay=false, hint, required, "aria-describedby":ariaDescribedby, ...restProps}, ref
) => {
    let Component = as

    const { noValidate } = useFormTagContext()
    const { controlId, isInputGroup, isFLoatingLabel } = useFormContext()
    const isOverlay = isInputGroup || isFLoatingLabel || errorAsOverlay

    let elementId = id ?? controlId

    let computedClassName = mergeClassnames(
        plaintext ? "sg-form-control-plaintext" : "sg-form-control",
        className != "" ? className : "",
        type == "color" ? "sg-form-control-color" : "",
        error ? "invalid":""
    )
    const errorMessageId = error ? elementId+"-error-message":undefined
    const hintMessageId = hint ? elementId+"-hint-message":undefined
    const tooltipMessage = isOverlay && (error || hint) ? 
        <div className="sg-form-control-description tooltip">
            {error? <ErrorMessage id={errorMessageId} message={error.message} /> : null}
            {hint? <HintMessage id={hintMessageId} message={hint.message} /> : null}
        </div> : undefined// "Testing a tooltip with a long message. This messsage is so long it hsould in theory trigger a wrap."

    const describedby = mergeClassnames(ariaDescribedby, errorMessageId, hintMessageId)
    return (
        <>
            <Overlay trigger={"focus"} position="auto" tooltip={tooltipMessage}>
                <Component 
                    required={(required && !noValidate) ?? undefined} 
                    aria-required={required ?? undefined} aria-invalid={error ? "true":"false"} aria-describedby={describedby != "" ? describedby : null}
                    autoFocus={autoFocus} ref={ref} 
                    id={elementId} type={type} className={computedClassName} {...restProps} />
            </Overlay>
            <div className="sg-form-control-description">
                {error && !isOverlay ? 
                    <ErrorMessage id={elementId} message={error.message} style={error.style} className={error.className}/>
                    : null }
                {hint && !isOverlay ?
                    <HintMessage id={elementId} message={hint.message} style={hint.style} className={hint.className}/>
                    : null }
            </div>
        </>
    )
})
Control.displayName = "FormControl"

const Group = forwardRef<HTMLDivElement, FormGroupType>( ({children, className, controlId, vertical, ...restProps}, ref) => {
    const context = useMemo(() => {
        return {controlId: controlId}
    }, [controlId])
    return (
        <div ref={ref} className={`sg-form-group${className ? " "+className : ""}${vertical ? " sg-form-group-vertical":""}`} {...restProps}>
            <FormContextProvider value={context}>
                {children}
            </FormContextProvider>
        </div>
    )
})
Group.displayName = "FormGroup"
 
const Label = forwardRef<HTMLLabelElement, FormLabelType>( ({children, className, htmlFor, ...restProps}, ref) => {
    const { controlId } = useFormContext()

    let elementHtmlFor = htmlFor ?? controlId
    return (
        <label ref={ref} htmlFor={elementHtmlFor} className={`sg-form-label${className ? " "+className : ""}`} {...restProps}>
            {children}
        </label>
    )
})
Label.displayName = "FormLabel"

const Check = forwardRef<HTMLInputElement, FormCheckType>( ({ children,
        classNameContainer, containerRef, containerId, styleContainer,
        classNameLabel, labelRef, label, labelId, styleLabel,
        className, type="checkbox", id, reverse=false, style, onChange, required, ...restProps 
    } , ref) => {
    const { noValidate } = useFormTagContext()
    const { controlId } = useFormContext()
    
    const typeComputed = !["radio", "checkbox", "color"].includes(type) ? "checkbox" :  type
    const classNameComputed = mergeClassnames(
        "sg-form-check-input",
        className ?? ""
    )
    const classNameLabelComputed = mergeClassnames(
        "sg-form-check-label",
        classNameLabel ?? ""
    )
    const classNameContainerComputed = mergeClassnames(
        "sg-form-check",
        reverse ? " sg-form-check-reverse":"",
        classNameContainer ?? "",
        type === "switch" ? " sg-form-switch":""
    )

    const [contrastColor, setContrastColor] = useState<React.CSSProperties>({})
    const onChangeInternal = (event: React.ChangeEvent<HTMLInputElement>) => {
        //setContrastColor({backgroundColor: "#"+contrastingColor(event.target.value)})
        if(onChange) onChange(event)
    }
    //required={(required && !noValidate) ?? undefined} aria-required={required ?? undefined}
    const elementId = id ?? controlId
    return (
        <div ref={containerRef} id={containerId} style={styleContainer} className={classNameContainerComputed} >
            {
                controlId ?
                    <input required={(required && !noValidate) ?? undefined} aria-required={required ?? undefined} id={controlId} ref={ref} type={typeComputed} style={style} className={classNameComputed} onChange={event => onChangeInternal(event)} {...restProps} />
                :
                    <label ref={labelRef} htmlFor={elementId} id={labelId} style={styleLabel} className={classNameLabelComputed}>
                        {reverse ? <span>{children ?? label}</span> : null}
                        <input required={(required && !noValidate) ?? undefined} aria-required={required ?? undefined} ref={ref} type={typeComputed} style={style} id={elementId} className={classNameComputed} onChange={event => onChangeInternal(event)} {...restProps} />
                        {!reverse ? <span>{children ?? label}</span> : null}
                    </label>
            }
        </div>
    )
})
Check.displayName = "FormCheck"

const Text = forwardRef<HTMLElement, FormTextType>( ({children, className, ...restProps}, ref) => {
    return (
        <small ref={ref} className={`sg-form-text${className ? " "+className:""}`} {...restProps}>
            {children}
        </small>
    )
})
Check.displayName = "FormText"

export const SliderContext = createContext<SliderContextType | null>(null)
export const SliderContextProvider = ({children, value} : {children: React.ReactNode, value:SliderContextType}) => {
    return (
        <SliderContext.Provider value={value}>
            {children}
        </SliderContext.Provider>
    )
}
export const useSliderContext = () => {
    const context = useContext(SliderContext)
    if(!context) {
        throw new Error("UseSliderContext must be used within a SliderContextProvider!")
    }
    return context
}

const Slider = forwardRef<HTMLSpanElement, FormSliderType>( ({className, style, controlId, min=1, max=10, step=1, defaultValue=6, value, onChange, ...restProps}, ref) => {
    const internalRef = useRef<HTMLDivElement>(null)
    //if(internalRef.current) console.log(internalRef.current)
    const trackEmpty = useRef<HTMLDivElement>(null)
    const trackFilled = useRef<HTMLDivElement>(null)
    const thumbRef = useRef<HTMLSpanElement>(null)
    const [ internalValue, setInternalValue ] = useState(value ? value + 1 - min : defaultValue - min)
    if(value && value != internalValue + min) {
        setInternalValue(value - min)
    }
    const internalMin = min < 1 ? 1 : min
    const internalMax = min < 1 ? max + 1 - min : max

    const [ isGrabbing, setIsGrabbing ] = useState(false)
    const updateValue = (value: number) => {
        let parsedValue = value < internalMin - 1 ? internalMin - 1 : value
        parsedValue = parsedValue > internalMax - internalMin ? internalMax - internalMin : parsedValue
        if(parsedValue === internalValue) return

        setInternalValue(parsedValue)
        if(onChange) {
            onChange(Math.abs(parsedValue) + min)
        }
    }
    const getNearestStep = (event: React.PointerEvent, targetElement: HTMLElement) => {
        const { pageX } = event
        const paddingLeft = parseFloat(window.getComputedStyle(targetElement, null).getPropertyValue('padding-left'))
        const leftEdge = targetElement.getBoundingClientRect().left + paddingLeft

        const width = targetElement.scrollWidth - 2*paddingLeft
        const thresholdDeltaX = width*(step)/(internalMax-internalMin)

        const relativeMousePositionX = (pageX - leftEdge)/thresholdDeltaX < 0 ? 0 : (pageX - leftEdge)/thresholdDeltaX
        const nearestStep = Math.round((pageX - leftEdge)/thresholdDeltaX)
        return { relativeMousePositionX, nearestStep }
    }

    const onPointerDownTrack = (event: React.PointerEvent) => {
        if(!internalRef.current) return
        const { nearestStep } = getNearestStep(event, internalRef.current)
        updateValue(nearestStep*step)
    }
    const onPointerDown = (event: React.PointerEvent) => {
        (event.target as HTMLElement).setPointerCapture(event.pointerId)
        setIsGrabbing(true)
        if(!thumbRef.current) return
        
    }
    
    const onPointerMove = (event: React.PointerEvent) => {
        if(!isGrabbing) return
        if(!internalRef.current) return
        const { relativeMousePositionX, nearestStep } = getNearestStep(event, internalRef.current)
        //console.log(nearestStep)
        const lowerBoundary = nearestStep === 0 || relativeMousePositionX === 0? -0.05 : 0.95*nearestStep
        const upperBoundary = nearestStep === 0 || relativeMousePositionX === 0? 0.05 : 1.05*nearestStep
        if(lowerBoundary < relativeMousePositionX && relativeMousePositionX < upperBoundary) {
            updateValue(nearestStep*step)
        }

    }

    const onPointerUp = (event: React.PointerEvent) => {
        setIsGrabbing(false)
    }

    const onKeyDown = (event: React.KeyboardEvent) => {
        let caseTrue = false
        switch (event.key) {
            case "ArrowLeft":
            case "ArrowDown":
                updateValue(internalValue - 1)
                event.preventDefault()
                break
            case "ArrowRight":
            case "ArrowUp":
                updateValue(internalValue + 1)
                event.preventDefault()
                break
            case "End":
                updateValue(internalMax - 1)
                event.preventDefault()
                break
            case "Home":
                updateValue(internalMin - 1)
                event.preventDefault()
                break
        }
    }
    const filled = (internalValue)/(internalMax-internalMin)
    const pointerActions = {onPointerDown, onPointerMove, onPointerUp}
    return (
        <div  onPointerDown={onPointerDownTrack} ref={mergeRefs([ref, internalRef])} id={controlId} style={{...style, "--filled":filled*100+"%"} as React.CSSProperties} className={useClassname("sg-form-slider", className)}>
            <span ref={trackFilled} className="sg-form-slider-filled" id={controlId+"-track-filled"}></span>
            <span 
                role="slider" tabIndex={0} ref={thumbRef} data-grabbing={isGrabbing} id={controlId+"-track-thumb"}
                {...pointerActions} onKeyDown={onKeyDown} className="sg-form-slider-thumb"
                aria-valuenow={internalValue + min} aria-valuemax={max} aria-valuemin={min} {...restProps}
            ></span>
            <span ref={trackEmpty} className="sg-form-slider-empty" id={controlId+"-track-empty"}></span>
        </div>
    )
})
Slider.displayName = "FormSlider"

const SelectTag = forwardRef<HTMLSelectElement, FormSelectTagType>( ({children, className, id, required,...restProps}, ref) => {
    const { noValidate } = useFormTagContext()
    const { controlId } = useFormContext()
    const elementId = id ?? controlId
    const classNameComputed = mergeClassnames("sg-form-select-tag", className ?? "")
    return (
        <select ref={ref} required={(required && !noValidate) ?? undefined} aria-required={required ?? undefined} className={classNameComputed} id={elementId} {...restProps}>
            {children}
        </select>
    )
})
SelectTag.displayName = "FormSelectTag"

export default  Object.assign(Form, {
    Control: Control,
    Select:  Select,
    SelectTag: SelectTag,
    Group: Group,
    Label: Label,
    Check: Check,
    Text: Text,
    Slider: Slider,
    WarningIcon: WarningIcon,
    Hint: HintMessage,
    Error: ErrorMessage
})