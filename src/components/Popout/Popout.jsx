import { createPortal } from "react-dom"
import React, { forwardRef, useEffect, useRef, useState } from "react"

export const useEventListener = (eventType, callback, options, customOptions) => {
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

const Popout = forwardRef(({children, initialPosition, id, resize=false, move=false, ...restProps}, ref) => {
    const [coordinates, setCoordinates] = useState({offSetTop:0, offSetLeft:0, ...initialPosition})
    console.log(coordinates)
    const resizeComputed = resize ? "true":"false"
    const moveComputed = move ? "true":"false"
    
    const popupRef = useRef(ref ? ref : null)
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const isMouseDownRef = useRef(isMouseDown)
    useEffect(() => {
        isMouseDownRef.current = isMouseDown
    }, [isMouseDown])

    const onMouseDown = (event) => {
        if(move && event.target.className.includes("sg-popout-title") || event.target.className.includes("sg-popout-header")) {
            const { top, left} = popupRef.current.getBoundingClientRect()
            setCoordinates(prev => ({
                ...prev,
                offSetTop:event.clientY - top,
                offSetLeft:event.clientX - left
            }))

            popupRef.current.style.setProperty("user-select", "none")
            popupRef.current.setPointerCapture("moveable-popup-"+id)
            setIsMouseDown(prev => true)
        }
    }
    const onMouseUp = (event) => {
        if(move) {
            popupRef.current.style.removeProperty("user-select")
            setIsMouseDown(prev => false)
        }
    }
    const onMouseMove = (event) => {
        if( move && isMouseDownRef.current ) {
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

    useEventListener("pointerup", onMouseUp, true, {element:document.body})
    return (
        createPortal(
            <dialog data-resize={resizeComputed} data-move={moveComputed}
                ref={popupRef} id={id} className="moveable-popout" 
                style={{top:coordinates.top, left:coordinates.left, bottom:coordinates.bottom, right:coordinates.right}}
                onMouseDown={onMouseDown} onMouseMove={onMouseMove}
            >
                {children}
            </dialog>
            , document.body
        )
    )
})


const Header = ({as, className, children, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"
    return (
        <Component ref={ref} className={`sg-popout-header ${className}`} {...restProps}>
            {children}
        </Component>
    )
}
Popout.Header = forwardRef(Header)

const Body = ({children, className, ...restProps}, ref) => {
    children = children.length ? children.filter(child => child != null && child != "") : children
    let subComponents = []
    React.Children.forEach(children, (child) => {
        subComponents.push(child)
    })
    return (
        <div ref={ref} className={`sg-popout-body ${className}`} {...restProps}>
            {subComponents.map(subComponent => subComponent)}
        </div>
    )
}
Popout.Body = forwardRef(Body)

const Title = ({as, className, children, ...restProps}, ref) => {
    let validAs = ["h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h5"
    return (
        <Component ref={ref} className={`sg-popout-title ${className}`} {...restProps}>
            {children}
        </Component>
    )
}
Popout.Title = forwardRef(Title)

const Text = ({children, className, ...restProps}, ref) => {
    return (
        <p ref={ref} className={`sg-popout-text ${className}`} {...restProps}>
            {children}
        </p>
    )
}
Popout.Text = forwardRef(Text)

const Footer = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-popout-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
}
Popout.Footer = forwardRef(Footer)

export { Popout }

