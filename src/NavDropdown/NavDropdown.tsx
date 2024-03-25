import React, { forwardRef, useCallback, useMemo, useState } from "react";

import { NavDropdownType } from "./NavDropdown.types";

import Dropdown, { DropdownContextProvider } from "../Dropdown/Dropdown";

const getDropdownMenuPlacement = (alignEnd: boolean, dropDirection: string, isRTL:boolean = false) => {
    const topStart = isRTL ? 'top-end' : 'top-start';
    const topEnd = isRTL ? 'top-start' : 'top-end';
    const bottomStart = isRTL ? 'bottom-end' : 'bottom-start';
    const bottomEnd = isRTL ? 'bottom-start' : 'bottom-end';
    const leftStart = isRTL ? 'right-start' : 'left-start';
    const leftEnd = isRTL ? 'right-end' : 'left-end';
    const rightStart = isRTL ? 'left-start' : 'right-start';
    const rightEnd = isRTL ? 'left-end' : 'right-end';
    let placement = alignEnd ? bottomEnd : bottomStart;
    if (dropDirection === 'up') 
        {
            placement = alignEnd ? topEnd : topStart
        }
    else if (dropDirection === 'end') {
        placement = alignEnd ? rightEnd : rightStart
    } else if (dropDirection === 'start') {
        placement = alignEnd ? leftEnd : leftStart
    } else if (dropDirection === 'down-centered') {
        placement = 'bottom'
    } else if (dropDirection === 'up-centered') {
        placement = 'top'
    }
    return placement;
}

const NavDropdown = forwardRef<HTMLDivElement, NavDropdownType>((
        {
            children, className, onSelect, onToggle, controlId, toggleProps, title, menuProps,
            drop="down", align="start", autoClose=true, show="default", ...restProps
        }, ref) => {
    const [showInternal, setShowInternal] = useState<boolean>(show === "default" ? false : show as boolean)

    // this is an object like {index: string} because we need it to rerender even if the case is the same
    // aka we use a "next/previous" case to navigate through the dropdown menu so need to rerender consecutive "next" cases
    const [activeDescendant, setActiveDescendant] = useState({case:""})

    const internalOnToggle = useCallback((event: MouseEvent) => {
        event.stopPropagation()
        setShowInternal(prev => !prev)
    }, [])

    const alignEnd = align === "end"
    const placement = getDropdownMenuPlacement(alignEnd, drop )

    const controlIdcomputed = controlId
    const contextValue  = useMemo(() => ({
        align, 
        drop, 
        showInternal: show != "default" && onToggle ? show as boolean : showInternal, 
        handleToggle: show != "default" && onToggle ? onToggle : internalOnToggle, 
        placement, 
        directionClasses: {
            down: "dropdown",
            'down-centered': `dropdown-center`,
            up: 'dropup',
            'up-centered': 'dropup-center dropup',
            end: 'dropend',
            start: 'dropstart'
        },
        controlId: controlIdcomputed, 
        activeDescendant, 
        setActiveDescendant,
        navDropdown: false
    }), [align, drop, show, showInternal, onToggle, internalOnToggle, placement, controlId, activeDescendant, setActiveDescendant])
    
    return (
        <div ref={ref} id={controlId+"-wrapper"} className={`sg-dropdown${className? " "+className:""} sg-nav-item`} {...restProps} >
            <DropdownContextProvider value={contextValue}>
                <Dropdown.Toggle navDropdown={true} {...toggleProps}>
                    {title}
                </Dropdown.Toggle>
                <Dropdown.Menu {...menuProps}>
                    {children}
                </Dropdown.Menu>
            </DropdownContextProvider>
        </div>
    )
})

export default  Object.assign(NavDropdown, {
    Toggle: Dropdown.Toggle,
    Menu: Dropdown.Menu,
    Item: Dropdown.Item,
    Divider: Dropdown.Divider
})