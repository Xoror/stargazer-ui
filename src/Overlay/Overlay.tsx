import React, { useEffect, useRef, useState, cloneElement, forwardRef, ReactNode, useLayoutEffect, ReactElement } from "react";
import { createPortal } from "react-dom";
import { OverlayType, PositionObject } from "./Overlay.types";

import mergeRefs from "../utils/MergeRefs";
import mergeClassnames from "../utils/MergeClassnames";


const setPosition = (referenceElement:any, overlayElement:any, position:string, arrowElement: any, isArrow: boolean=false, boundaryCorrection: PositionObject = {top:0, left:0, bottom: 0, right: 0}) => {
    if(!overlayElement.current) return {top:0, left:0}
    const refCurrent = referenceElement.current as HTMLElement 
    const overlayCurrent = overlayElement.current as HTMLElement 
    const arrowCurrent = arrowElement.current as HTMLElement 

    const refTop = refCurrent.getBoundingClientRect().top
    const refHeight = refCurrent.offsetHeight
    const refLeft = refCurrent.getBoundingClientRect().left
    const refWidth = refCurrent.offsetWidth

    const overlayHeight = overlayCurrent.getBoundingClientRect().height
    const overlayWidth = overlayCurrent.getBoundingClientRect().width

    const arrowHeight = arrowCurrent.getBoundingClientRect().height
    const arrowWidth = arrowCurrent.getBoundingClientRect().width
    //console.log(refTop, arrowHeight, arrowWidth)

    const overlayBorderWidth = parseFloat(getComputedStyle(overlayCurrent).borderWidth.split("px")[0])
    const arrowOffsetHeight = isArrow ? arrowHeight/2 : arrowHeight - overlayBorderWidth
    const arrowOffsetWidth = isArrow ? arrowWidth/2 : arrowWidth - overlayBorderWidth

    const correctPosition = (position:string, offset:number, boundary:number) => {
        const positionKey = position as keyof typeof tempPos
        if(overlayCurrent.getBoundingClientRect()[positionKey]<= boundary) {
            return offset
        }
        else {
            return tempPos[positionKey]
        }
    }

    let tempPos: PositionObject
    switch(position) {
        case "top": 
            tempPos = { 
                top: refTop - overlayHeight - arrowOffsetHeight, 
                left: refLeft + refWidth/2 - (isArrow ? arrowOffsetWidth/2 : overlayWidth/2) 
            }
            console.log(isArrow, refLeft, refWidth/2, overlayWidth/2 )
            //tempPos.right = correctPosition("right", 12, 0)
            //tempPos.left = correctPosition("left", 0, 0)
            return tempPos
        case "right":
            tempPos = { 
                top: refTop + refHeight/2 - overlayHeight/2, 
                left: refLeft + refWidth + arrowOffsetWidth
            }
            //tempPos.bottom = correctPosition("bottom", window.scrollY + window.innerHeight, 0)
            //tempPos.top = correctPosition("top", window.scrollY, 48)
            return tempPos
        case "bottom":
            tempPos = { 
                top: refTop + refHeight  + arrowOffsetHeight, 
                left: refLeft + refWidth/2 - overlayWidth/2 
            }
            //tempPos.right = correctPosition("right", 12, 0)
            //tempPos.left = correctPosition("left", 0, 0)
            return tempPos
        case "left":
            tempPos = { 
                top: refTop + refHeight/2 - overlayHeight/2, 
                left: refLeft - overlayWidth - arrowOffsetWidth
            }
            //tempPos.bottom = correctPosition("bottom", window.scrollY + window.innerHeight, 0)
            //tempPos.top = correctPosition("top", window.scrollY, 48)
            return tempPos
        default:
            //this is just top
            return { top: refTop - overlayHeight - arrowHeight, left: refLeft + refWidth/2 - overlayWidth/2 }
    }
}

const updateAutoPosition = (autoPositionRef:any, positionRef:any, overlayRef:any, arrowRef:any) => {
    let topDistance = positionRef.current.getBoundingClientRect().top
    let bottomDistance = window.innerHeight - positionRef.current.getBoundingClientRect().bottom
    let leftDistance = positionRef.current.getBoundingClientRect().left
    let rightDistance = window.innerWidth - positionRef.current.getBoundingClientRect().right

    let totalOverlayWidth = overlayRef.current.clientWidth + arrowRef.current.clientWidth + 48
    let totalOverlayHeight = overlayRef.current.clientHeight + arrowRef.current.clientHeight + 48
    //console.log(autoPositionRef.current, positionRef.current, overlayRef.current, arrowRef.current)

    if(topDistance >= totalOverlayHeight) {
        return "top"
    } else if(topDistance >= totalOverlayHeight/2) {
        return rightDistance >= totalOverlayWidth ? "right" : "left"
    } else if(bottomDistance >= totalOverlayHeight) {
        return "bottom"
    } else {
        return autoPositionRef.current
    }
}

const Overlay = forwardRef<HTMLDivElement, OverlayType>( ({
        children, overlay, tooltip, show=false, onToggle, 
        position="auto", trigger="click", defaultShow=false,
        tooltipClassname, tooltipStyle, arrowClassname, arrowStyle}, ref
    ) => {
    if(Array.isArray(children)) {
        throw new Error(
            "Overlay can only wrap a single element, either introduce a wrapper or remove all but one trigger element!"
        )
    }
    
    const positionRef = useRef<typeof children | null>(null)
    const overlayRef = useRef<HTMLDivElement | null>(null)
    const arrowRef = useRef<HTMLDivElement>(null)
    const [arrowPosition, setArrowPosition] = useState<PositionObject>({top:0, left:0})
    const [overlayPosition, setOverlayPosition] = useState<PositionObject>({top:0, left:0})
    const [internalShow, setInternalShow] = useState(defaultShow)
    const internalShowRef = useRef(internalShow)
    const setInternalShowRef = (updatedValue: boolean) => {
        internalShowRef.current = updatedValue
        setInternalShow(updatedValue)
    }
    if(show && show != internalShow) {
        console.log("show")
        setInternalShowRef(show)
    }

    //const positionsList = ["top", "right", "bottom", "left"]
    const [autoPosition, setAutoPosition] = useState(position === "auto" ? "top" : position)
    const autoPositionRef = useRef(autoPosition)
    const setAutoPositionRef = (updatedValue: any) => {
        autoPositionRef.current = updatedValue
        setAutoPosition(updatedValue)
    }

    const [isHovering, setIsHovering] = useState(false)
    const [isFocused, setIsFocused] = useState(false)
    const [firstClick, setFirstClick] = useState(true)
    const triggerArray = Array.isArray(trigger) ? trigger : [trigger]

    const positionSetter = (positionRef:any , overlayRef: any, arrowRef: any) => {
        setOverlayPosition( setPosition(positionRef, overlayRef, autoPositionRef.current, arrowRef) )
        setArrowPosition( setPosition(positionRef, arrowRef, autoPositionRef.current, arrowRef, true) )
    }
    const handleScroll = () => {
        if(internalShowRef.current) {
            positionSetter(positionRef, overlayRef, arrowRef)
        }
        if(internalShowRef.current && position === "auto") {
            let updatedPosition = updateAutoPosition(autoPositionRef, positionRef, overlayRef, arrowRef)
            setAutoPositionRef(updatedPosition)
        }
    }
    const resizeHandler = () => {
        if(internalShowRef.current) {
            positionSetter(positionRef, overlayRef, arrowRef)
        }
        if(!internalShowRef.current && position === "auto") {
            //setAutoPosition(detectAutoPostition(overlayRef, autoPositionRef))
        }
    }
    const { onClick, onHover, onFocus, onBlur, onMouseOver, onMouseLeave} = (children as ReactElement)!.props
    //console.log(children)
    /* Event handler funtions */
    const handleClick = (event: MouseEvent) => {
        
        if(isFocused && firstClick) {
            //this is needed in case both "focus" and "click" are triggers, otherwise there's weird behaviour
            setFirstClick(false) 
            return
        }
        setInternalShowRef(!internalShow)
        if(onToggle) {
            onToggle(!internalShow)
        }
        if(onClick) {
            onClick(event)
        }
    }
    const handleHover = (event: MouseEvent) => {
        setInternalShowRef(true)
        if(!isHovering) {
            setIsHovering(true)
            if(onToggle) {
                onToggle(true)
            }
        }
        if(onHover) {
            onHover(event)
        }
    }
    const handleFocus = (event: MouseEvent) => {
        //console.log("focus")
        setInternalShowRef(true)
        setIsFocused(true)
        if(onToggle) {
            onToggle(true)
        }
        if(onFocus) {
            onFocus(event)
        }
    }
    const handleBlur = (event: MouseEvent) => {
        //console.log("blur")
        if(isHovering) {
            setIsHovering(false)
        } else if(isFocused) {
            setIsFocused(false)
            setFirstClick(true)
        }
        setInternalShowRef(false)
        if(onToggle) {
            onToggle(false)
        }
        if(onBlur) {
            onBlur(event)
        }
    }
    useLayoutEffect(() => {
        if(overlayRef.current && arrowRef.current) {
            positionSetter(positionRef, overlayRef, arrowRef)
        }
    }, [])

    useEffect(() => {
        if(overlayRef.current && arrowRef.current) {
            positionSetter(positionRef, overlayRef, arrowRef)
        }
        //setInternalShowRef(show)
    },[internalShow, overlayRef, positionRef, autoPosition])


    useEffect(() => {
        window.addEventListener("scroll", handleScroll, true)
        window.addEventListener("resize", resizeHandler, true)
        return function cleanup() {
            window.removeEventListener("scroll", handleScroll, true)
            window.removeEventListener("resize", resizeHandler, true)
        }
    }, [])

    const checkRefPositionStyle = (positionRef: any) => {
        let elementComputedPositionStyle = getComputedStyle(positionRef.current)["position"]
        if(elementComputedPositionStyle === "fixed") {
            return "fixed"
        } else if(elementComputedPositionStyle === "sticky") {
            return "sticky"
        } else {
            return "absolute"
        }
    }
    const tooltipClassnames = mergeClassnames("sg-overlay-wrapper", "sg-tooltip-wrapper", tooltipClassname)
    const arrowClassnames = mergeClassnames(
        "sg-overlay-arrow", 
        autoPosition ? " overlay-position-"+autoPosition : "",
        tooltip ? "sg-tooltip-arrow":"",
        arrowClassname
    )
    
    return (
        <>
            {
                cloneElement(children as any, {
                    ref: mergeRefs([positionRef, (children as any).ref]),
                    onClick: triggerArray.find(trigger => trigger === "click") ? handleClick : onClick,
                    onMouseOver: triggerArray.find(trigger => trigger === "hover") ? handleHover : onMouseOver,
                    onMouseLeave: triggerArray.find(trigger => trigger === "hover") ? handleBlur : onMouseLeave,
                    onFocus: triggerArray.find(trigger => trigger === "focus") ? handleFocus : onFocus,
                    onBlur: triggerArray.find(trigger => trigger === "focus") ? handleBlur : onBlur,
                })
            }
            {internalShow ? createPortal(
                <>
                    {overlay ?
                        <>
                            <div className="sg-overlay-wrapper"
                                ref={mergeRefs([ref,overlayRef])}
                                style={{ position:checkRefPositionStyle(positionRef), top:overlayPosition!.top, left:overlayPosition!.left }}
                            >{overlay}</div>
                            <div
                                ref={arrowRef} aria-hidden
                                className={arrowClassnames} 
                                style={{...arrowStyle, position:checkRefPositionStyle(positionRef), top:arrowPosition!.top, left:arrowPosition!.left,}}>
                            </div>
                        </>
                    : null}
                    {tooltip ? 
                        <>
                            <div className={tooltipClassnames}
                                ref={mergeRefs([ref,overlayRef])}
                                style={{...tooltipStyle, position:checkRefPositionStyle(positionRef), top:overlayPosition!.top, left:overlayPosition!.left }}
                            >{tooltip}</div>
                            <div
                                ref={arrowRef} aria-hidden
                                className={arrowClassnames} 
                                style={{...arrowStyle, position:checkRefPositionStyle(positionRef), top:arrowPosition!.top, left:arrowPosition!.left,}}>
                            </div>
                        </>
                        :
                    null}
                </>
            , document.body) : null}
        </>
    )
})
Overlay.displayName = "Overlay"

export default Overlay
