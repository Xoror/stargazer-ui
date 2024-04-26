import { useRef, useState, useEffect, RefObject, useLayoutEffect, cloneElement, ReactNode } from "react"
import { createPortal } from "react-dom"

type Coordinates = {
    top?: number, 
    bottom?: number, 
    right?: number, 
    left?: number, 
    offSetTop:number, 
    offSetLeft:number,
    width?: number | null
}
type Dimensions = {
    height?: number,
    width?: number
}
type Options = {
    moveClass?: string,
    draggable?: boolean
}

export const insertPhantomElement = (targetElement: HTMLElement, movingElement: HTMLElement, options: {after?:boolean, first?:boolean} = {after: true, first: true}) => {
    const nextSibling = targetElement.nextElementSibling as HTMLElement
    const previousSibling = targetElement.previousElementSibling as HTMLElement
    const phantomData = document.querySelectorAll<HTMLElement>("[data-phantom='before'], [data-phantom='after']")
    phantomData.forEach(element => {
        if( targetElement !== element) {
            element.dataset.phantom = "none"
            //console.log("equal")
        }
    })
    targetElement.dataset.phantom = options.after ? "after":"before"
    if(options.after && nextSibling) { nextSibling.dataset.phantom = "before" }
    if(!options.after && previousSibling) { previousSibling.dataset.phantom = "after" }

    const { width, height } = movingElement.getBoundingClientRect()
    const parentElement = targetElement.parentElement!

    document.querySelectorAll(".phantom").forEach(phantom => phantom.remove())

    const phantomDiv = document.createElement("li")
    phantomDiv.classList.add("phantom")
    phantomDiv.classList.add("sg-sublist")
    phantomDiv.style.width = options.first ? width.toString()+"px" : ""
    phantomDiv.style.height = height.toString()+"px"
    parentElement.insertBefore(phantomDiv, options.after ? targetElement.nextSibling : targetElement)
}

const insertDraggedElement = () => {

}

/*
const useDraggable = (movingElementRef: RefObject<HTMLElement>, options: Options = {}) => {
    const [ dragging, setDragging ] = useState<boolean>(false)

    const onDragStart = (event: React.DragEvent) => {
        console.log("drag start")
        insertPhantomElement(movingElementRef.current!)
    }

    const onDragEnd = (event: React.DragEvent) => {
        document.querySelectorAll(".phantom").forEach(phantom => phantom.remove())
    }

    return { onDragStart, onDragEnd }
}
*/

const useDraggable = (movingElementRef: RefObject<HTMLElement>, options: Options = {draggable: false}) => {
    const [coordinates, setCoordinates] = useState<Coordinates>({offSetTop:0, offSetLeft:0})
    const [ isMouseDown, setIsMouseDown ] = useState<boolean>(false)
    
    const elementWithPhantom = useRef<HTMLElement | null>(null)
    const isMouseDownRef = useRef<boolean>(isMouseDown)
    const coordinatesRef = useRef<Coordinates>(coordinates)
    useEffect(() => {
        isMouseDownRef.current = isMouseDown
    }, [isMouseDown])
    useEffect(() => {
        coordinatesRef.current = coordinates
    }, [coordinates])

    useEffect(() => {
        if(movingElementRef && options.draggable) {
            const movingElement = movingElementRef.current!

            const onPointerDown = (event: PointerEvent) => {      
                event.stopPropagation()
                const { width } = (event.target as HTMLElement).getBoundingClientRect()

                insertPhantomElement(movingElement, movingElement, {first: true})

                const { top, left} = movingElement.getBoundingClientRect()
                //Initial coordinates & setup for moving
                setCoordinates(prev => ({
                    ...prev,
                    top: top,
                    left: left,
                    offSetTop:event.clientY - top,
                    offSetLeft:event.clientX - left,
                    width: width
                }))
                movingElement.style.setProperty("user-select", "none")
                movingElement.setPointerCapture(event.pointerId)
                movingElement.classList.add("moving")
                setIsMouseDown(true)
            }
            const onPointerUp = (event: PointerEvent) => {
                if(isMouseDownRef.current) {
                    const phantomElement = document.querySelectorAll(".phantom")[0]
                    const phantomElementParent = phantomElement.parentElement!

                    phantomElementParent.insertBefore(movingElement, phantomElement)

                    document.querySelectorAll(".phantom").forEach(phantom => phantom.remove())
                    
                    movingElement.style.removeProperty("user-select")
                    movingElement.classList.remove("moving")
                    setCoordinates(prev => ({
                        ...prev,
                        width: null
                    }))
                    setIsMouseDown(false)
                }
            }
            const onPointerMove = (event: PointerEvent) => {
                if(isMouseDownRef.current) {
                    const isTopOver = event.clientY - coordinatesRef.current.offSetTop < 0
                    const isBottomOver = window.innerHeight - (event.clientY - coordinatesRef.current.offSetTop + movingElement.offsetHeight) < 0
                    const isLeftOver = event.clientX - coordinatesRef.current.offSetLeft < 0
                    const isRightOver = window.innerWidth - (event.clientX - coordinatesRef.current.offSetLeft + movingElement.offsetWidth) < 0

                    let topCoordinate = isTopOver ? 0 : event.clientY - coordinatesRef.current.offSetTop
                    topCoordinate = isBottomOver ? window.innerHeight - movingElement.offsetHeight : topCoordinate

                    let leftCoordinate = isLeftOver ? 0 : event.clientX - coordinatesRef.current.offSetLeft
                    leftCoordinate = isRightOver ? window.innerWidth - movingElement.offsetWidth : leftCoordinate

                    setCoordinates(prev => ({
                        ...prev,
                        top:topCoordinate,
                        left:leftCoordinate
                    }))

                    movingElement.hidden = true
                    const elemBelow = document.elementFromPoint(event.clientX, event.clientY)
                    movingElement.hidden = false
                    const isElemeBelowDropable = elemBelow?.classList.contains("sg-list-item") || elemBelow?.classList.contains("sg-sublist")
                    const elemBelowClosestDroppable = isElemeBelowDropable ? elemBelow as HTMLElement : elemBelow?.closest(".sg-list-item, .sg-sublist") as HTMLElement 
                    console.log(elemBelow, elemBelowClosestDroppable)

                    if(!elemBelowClosestDroppable || elemBelow?.classList.contains("phantom")) { return }

                    if(elementWithPhantom.current != elemBelowClosestDroppable) {
                        elementWithPhantom.current = elemBelowClosestDroppable
                    }
                    
                    const {top, left, width, height} = elementWithPhantom.current.getBoundingClientRect()
                    const phantomPosition = elementWithPhantom.current.dataset.phantom

                    const afterTest = event.clientY - top >= height/2 && phantomPosition != "after"
                    const beforeTest = event.clientY - top < height/2 && phantomPosition != "before"
                    if(afterTest || beforeTest) {
                        insertPhantomElement(elementWithPhantom.current, movingElement, {after: afterTest ? true : false})
                    }
                }
            }

            const bubble = false

            movingElement.addEventListener("pointerdown", onPointerDown, bubble)
            movingElement.addEventListener("pointerup", onPointerUp, bubble)
            movingElement.addEventListener("pointermove", onPointerMove, bubble)
            return function cleanup() {
                movingElement.removeEventListener("pointerdown", onPointerDown, bubble)
                movingElement.removeEventListener("pointerup", onPointerUp, bubble)
                movingElement.removeEventListener("pointermove", onPointerMove, bubble)
            }
        }
    },[])

    return { coordinates, isMouseDown}
}

export default useDraggable