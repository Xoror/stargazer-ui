import React, { forwardRef, createContext, useContext, useReducer, useRef, useEffect } from "react"

import { ListType, ListItem, FormContextType } from "./List.types"
import useDraggable from "../hooks/useDraggable"

export const ListContext = createContext<FormContextType | null>(null)
export const FormContextProvider = ({children, value} : {children: React.ReactNode, value:FormContextType}) => {
    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )
}
export const useFormContext = () => {
    const context = useContext(ListContext)
    return context
}

const List = forwardRef<HTMLUListElement, ListType>( ({children, depth, tree=false}, ref) => {
    /*
    const inheritedContext = useContext(ListContext)

    const context = {
        depth: inheritedContext ? inheritedContext.depth : depth,
        tree: inheritedContext ? inheritedContext.tree : tree,
    }
    */



    return (
            <ul id="test-list" className="sg-list" style={{"--depth":depth} as React.CSSProperties}>
                {children}
            </ul>
    )
})

const Item = forwardRef<HTMLLIElement, ListItem>( ({children, ...restProps}, ref) => {
    const itemRef = useRef<HTMLLIElement>(null)

    const coordinates = useDraggable(itemRef)
    
    /*
    useEffect(() => {
        if(itemRef.current) {
            let listItem = itemRef.current!

            const handleMouseIn = (event: PointerEvent) => {
                console.log(event.target)
            }

            listItem.addEventListener("pointerover", handleMouseIn, false)
            return function cleanup() {
                listItem.removeEventListener("pointerover", handleMouseIn, false)
            }
        }
    },[])
    */
    
    return (
        <li ref={itemRef} className="sg-list-item" style={{ top: coordinates.top, left: coordinates.left }} {...restProps} >
            {children}
        </li>
    )
})

export default  Object.assign(List, {
    Item: Item
})