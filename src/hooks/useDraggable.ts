import { useRef, useState, useEffect, RefObject } from "react"

type Coordinates = {
    top?: number, 
    bottom?: number, 
    right?: number, 
    left?: number, 
    offSetTop:number, 
    offSetLeft:number 
}
type Options = {
    moveClass?: string
}

const useDraggable = (movingElementRef: RefObject<HTMLLIElement>, options: Options = {}) => {
    const [coordinates, setCoordinates] = useState<Coordinates>({offSetTop:0, offSetLeft:0})
    const [ isMouseDown, setIsMouseDown ] = useState<boolean>(false)
    const isMouseDownRef = useRef<boolean>(isMouseDown)
    useEffect(() => {
        isMouseDownRef.current = isMouseDown
    }, [isMouseDown])

    useEffect(() => {
        if(movingElementRef) {
            const movingElement = movingElementRef.current!
            const onPointerDown = (event: PointerEvent) => {            
                const { top, left} = movingElement.getBoundingClientRect();
                setCoordinates(prev => ({
                    ...prev,
                    offSetTop:event.clientY - top,
                    offSetLeft:event.clientX - left
                }))
                movingElement.style.setProperty("user-select", "none")
                movingElement.setPointerCapture(event.pointerId)
                movingElement.classList.add("moving")
                setIsMouseDown(true)
                
            }
            const onPointerUp = (event: PointerEvent) => {
                movingElement.style.removeProperty("user-select")
                movingElement.classList.remove("moving")
                setIsMouseDown(false)
            }
            const onPointerMove = (event: PointerEvent) => {
                if(isMouseDown) {
                    const isTopOver = event.clientY - coordinates.offSetTop < 0
                    const isBottomOver = window.innerHeight - (event.clientY - coordinates.offSetTop + movingElement.offsetHeight) < 0
                    const isLeftOver = event.clientX - coordinates.offSetLeft < 0
                    const isRightOver = window.innerWidth - (event.clientX - coordinates.offSetLeft + movingElement.offsetWidth) < 0

                    let topCoordinate = isTopOver ? 0 : event.clientY - coordinates.offSetTop
                    topCoordinate = isBottomOver ? window.innerHeight - movingElement.offsetHeight : topCoordinate

                    let leftCoordinate = isLeftOver ? 0 : event.clientX - coordinates.offSetLeft
                    leftCoordinate = isRightOver ? window.innerWidth - movingElement.offsetWidth : leftCoordinate

                    setCoordinates(prev => ({
                        ...prev,
                        top:topCoordinate,
                        left:leftCoordinate
                    }))
                }
            }

            movingElement.addEventListener("pointerdown", onPointerDown, false)
            movingElement.addEventListener("pointerup", onPointerUp, false)
            movingElement.addEventListener("pointermove", onPointerMove, false)
            return function cleanup() {
                movingElement.removeEventListener("pointerdown", onPointerDown, false)
                movingElement.removeEventListener("pointerup", onPointerUp, false)
                movingElement.removeEventListener("pointermove", onPointerMove, false)
            }
        }
    },[])

    return coordinates
}

export default useDraggable