import React, { forwardRef, createContext, useContext, useRef, cloneElement, ReactElement, useMemo } from "react"

import { ListType, ListSublistType, ListItemType, ListLabelType, FormContextType } from "./List.types"
import useDraggable, { insertPhantomElement } from "../hooks/useDraggable"
import useClassname from "../hooks/useClassname"
import mergeRefs from "../utils/MergeRefs"

export const ListContext = createContext<FormContextType | null>(null)
export const ListContextProvider = ({children, value} : {children: React.ReactNode, value:FormContextType}) => {
    return (
        <ListContext.Provider value={value}>
            {children}
        </ListContext.Provider>
    )
}
export const useListContext = () => {
    const context = useContext(ListContext)
    
    return context
}

/*
const handlePhantomInsert = (event: React.PointerEvent, item: HTMLElement | null) => {
    event.stopPropagation()
    document.querySelectorAll(".phantom").forEach(phantom => phantom.remove())
    if(item) { insertPhantomElement(item)}
}
*/

const List = forwardRef<HTMLUListElement, ListType>( ({children, className, depth, tree=false, dragdrop=false, ...restProps}, ref) => {
    
    const context = useListContext()
    const initialContext = useMemo(() => ({
        tree: tree,
        draggable: dragdrop
    }), [])

    return (
            <ul ref={ref} id="test-list" data-context={context ? "true":"false" } className={useClassname("sg-list", className)} style={{"--depth":depth} as React.CSSProperties} {...restProps}>
                { !context ? 
                    <ListContextProvider value={initialContext}>
                        {children}
                    </ListContextProvider> 
                    :
                    children
                }
            </ul>
    )
})

const Sublist = forwardRef<HTMLLIElement, ListSublistType>( ({children, className, depth, ...restProps}, ref) => {
    const { draggable } = useListContext()!
    const itemRef = useRef<HTMLLIElement>(null)

    const { coordinates, isMouseDown} = useDraggable(itemRef, {draggable})

    return (
        <li ref={mergeRefs([ref,itemRef])} data-phantom="none" className={useClassname("sg-sublist", className)} style={{ "--depth":depth, top: coordinates.top, left: coordinates.left, width: coordinates.width } as React.CSSProperties} {...restProps}>
            {children}
        </li>
    )
})

const Item = forwardRef<HTMLLIElement, ListItemType>( ({children, className, ...restProps}, ref) => {
    const { draggable } = useListContext()!
    const itemRef = useRef<HTMLLIElement>(null)

    const { coordinates, isMouseDown} = useDraggable(itemRef, {draggable})

    return (
        <li ref={itemRef} data-phantom="none" className={useClassname("sg-list-item", className)} style={{ top: coordinates.top, left: coordinates.left, width: coordinates.width } as React.CSSProperties} {...restProps} >
            {children}
        </li>
    )
})

const Label = forwardRef<HTMLSpanElement, ListLabelType>( ({children, className, style, ...restProps}, ref) => {
    const labelRef = useRef<HTMLElement>(null)
    const computedClass = useClassname("sg-list-label", className)

    //const coordinates = useDraggable(labelRef)
    return (
        (typeof children === "string") ?
            <span ref={mergeRefs([ref, labelRef])} className={computedClass} style={{ ...style}} {...restProps}>
                {children}
            </span>
            :
            cloneElement(children as any,
                {
                    ref: mergeRefs([ref, labelRef]),
                    className: computedClass,
                    style: { ...(children as ReactElement).props.style}
                }
            )
            
    )
})
/*
List.Sublist = Sublist
List.Item = Item
List.Label = Label

export default List
*/
export default  Object.assign(List, {
    Sublist: Sublist,
    Item: Item,
    Label: Label
})
