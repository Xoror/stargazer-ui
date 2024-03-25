import { createPortal } from "react-dom";
import React, { forwardRef, useEffect, useRef, useState } from "react";

import { PopoutType, PopoutBodyType, PopoutFooterType, PopoutHeaderType, PopoutTextType, PopoutTitleType } from "./Popout.types";
/*
export const useEventListener = (eventType: keyof HTMLElementEventMap, callback: EventListenerOrEventListenerObject, options: boolean | AddEventListenerOptions | undefined, customOptions: {element: HTMLElement}) => {
    const element = customOptions ? customOptions.element : document.body
    useEffect(() => {
        if(element) {
            element.addEventListener(eventType, callback, options)
            return function cleanup() {
                element.removeEventListener(eventType, callback, options)
            }
        }
    }, [callback, element])
}
*/

const Popout = forwardRef<HTMLDialogElement, PopoutType>(({children, initialPosition={top:0, left:0}, id, resize=false, move=false, className, style, ...restProps}, ref) => {
    const [coordinates, setCoordinates] = useState<{ top?: number, bottom?: number, right?: number, left?: number, offSetTop:number, offSetLeft:number }>({offSetTop:0, offSetLeft:0, ...initialPosition})
    const resizeComputed = resize ? "true":"false"
    const moveComputed = move ? "true":"false"
    
    const passedRef = useRef(ref)
    const popupRef = useRef<HTMLDialogElement>(null)
    const [ isMouseDown, setIsMouseDown ] = useState<boolean>(false)
    const isMouseDownRef = useRef(isMouseDown)
    useEffect(() => {
        isMouseDownRef.current = isMouseDown
    }, [isMouseDown])

    const onMouseDown = (event: React.PointerEvent<HTMLDialogElement>) => {
        const eventTarget = event.target as HTMLElement
        if(move && eventTarget.className.includes("sg-popout-title") || eventTarget.className.includes("sg-popout-header")) {
            const { top, left} = popupRef.current!.getBoundingClientRect();
            setCoordinates(prev => ({
                ...prev,
                offSetTop:event.clientY - top,
                offSetLeft:event.clientX - left
            }))
            popupRef.current!.style.setProperty("user-select", "none")
            popupRef.current!.setPointerCapture(event.pointerId)//event.pointerId)//"moveable-popup-"+id);
            setIsMouseDown(true)
        }
    }
    const onMouseUp = () => {
        if(move) {
            popupRef.current!.style.removeProperty("user-select")
            setIsMouseDown(false)
        }
    }
    const onMouseMove = (event: React.PointerEvent<HTMLDialogElement>) => {
        if( move && isMouseDownRef.current && popupRef.current ) {
            const isTopOver = event.clientY - coordinates.offSetTop < 0
            const isBottomOver = window.innerHeight - (event.clientY - coordinates.offSetTop + popupRef.current.offsetHeight) < 0
            const isLeftOver = event.clientX - coordinates.offSetLeft < 0
            const isRightOver = window.innerWidth - (event.clientX - coordinates.offSetLeft + popupRef.current.offsetWidth) < 0

            let topCoordinate = isTopOver ? 0 : event.clientY - coordinates.offSetTop
            topCoordinate = isBottomOver ? window.innerHeight - popupRef.current.offsetHeight : topCoordinate

            let leftCoordinate = isLeftOver ? 0 : event.clientX - coordinates.offSetLeft
            leftCoordinate = isRightOver ? window.innerWidth - popupRef.current.offsetWidth : leftCoordinate

            //console.log(event.clientX - coordinates.offSetLeft, event.clientY - coordinates.offSetTop)
            setCoordinates(prev => ({
                ...prev,
                top:topCoordinate,
                left:leftCoordinate
            }))
        }
    }

    useEffect(() => {
        document.body.addEventListener("pointerup", () => onMouseUp(), true)
        return function cleanup() {
            document.body.removeEventListener("pointerup", () => onMouseUp(), true)
        }
    }, [])
    return (
        createPortal(
            <dialog data-resize={resizeComputed} data-move={moveComputed} data-passedref={passedRef}
                ref={popupRef} id={id} className={`sg-moveable-popout${className ? " "+className : ""}`}
                style={{...style, top:coordinates.top, left:coordinates.left, bottom:coordinates.bottom, right:coordinates.right}}
                onPointerDown={onMouseDown} onPointerMove={(event) => onMouseMove(event)} {...restProps}
            >
                {children}
            </dialog>
            , document.body
        )
    )
})

const Header = forwardRef<HTMLDivElement | HTMLSpanElement | HTMLHeadingElement, PopoutHeaderType>(
        ({ children, className, as = "div", ...restProps}, ref) => 
    {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    return (
        <Component ref={ref} className={`sg-popout-header ${className}`} {...restProps}>
            {children}
        </Component>
    )
})

const Title = forwardRef<HTMLHeadingElement, PopoutTitleType>( ({as="h4", className, children, ...restProps}, ref) => {
    let validAs = ["h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h5"
    return (
        <Component ref={ref} className={`sg-popout-title ${className}`} {...restProps}>
            {children}
        </Component>
    )
})

const Body = forwardRef<HTMLDivElement, PopoutBodyType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-popout-body ${className}`} {...restProps}>
            {children}
        </div>
    )
})

const Text = forwardRef<HTMLParagraphElement, PopoutTextType>( ({children, className, ...restProps}, ref) => {
    return (
        <p ref={ref} className={`sg-popout-text ${className}`} {...restProps}>
            {children}
        </p>
    )
})

const Footer = forwardRef<HTMLDivElement, PopoutFooterType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-popout-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
})

export default  Object.assign(Popout, {
    Header: Header,
    Title: Title,
    Body: Body,
    Text: Text,
    Footer: Footer
})

