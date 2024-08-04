import React, { createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";

import { DropdownContextType, DropdownItemType, DropdownDividerType, DropdownMenuType, DropdownToggleType, DropdownType } from "./Dropdown.types";
//automatic menu placement function
const getDropdownMenuPlacement = (controlId: string, drop: string="down", align: string="start") => {
    const dropPossible = ["down", "up", "right", "left"]
    const alignPossible = ["start", "end", "center"]
    let placement = (dropPossible.find(item => item === drop) ? drop : "down") + "-" + (alignPossible.find(item => item === align) ? align : "start")
    const topOffset = drop === "down" || drop === "up" ? 5 : 0
    const leftOffset = drop === "right" || drop === "left" ? 5 : 0

    const button = document.getElementById(controlId)!
    const buttonLeftBase = button.getBoundingClientRect().left
    const buttonTopBase = button.getBoundingClientRect().top + button.clientHeight

    const menu = document.getElementById(controlId+"-menu")!
    let position = {
        top: drop === "up" ? buttonTopBase - (menu.clientHeight + button.clientHeight + topOffset) : buttonTopBase + topOffset, 
        left: drop === "right" ? buttonLeftBase + button.clientWidth + leftOffset: (drop === "left" ? buttonLeftBase - menu.clientWidth - leftOffset : buttonLeftBase)
    }
    
    switch (placement) {
        case "down-start":
        case "up-start":
            break
        case "down-center":
        case "up-center":
            position.left += -1 * (menu.clientWidth - button.clientWidth)/2
            break
        case "down-end":
        case "up-end":
            position.left += -1 * (menu.clientWidth - button.clientWidth)
            break
        
        case "right-start":
        case "left-start":
            position.top += -1 * button.clientHeight
            break
        case "right-center":
        case "left-center":
            position.top += -1 * button.clientHeight/2 - menu.clientHeight/2
            break
        case "right-end":
        case "left-end":
            position.top += -1 * menu.clientHeight
        
    }
    return position
}
// is click event on the menu
const isEventOnMenu = (event:MouseEvent, controlId:string = "") => {
    const element = event.target as HTMLElement
    const eventIsOnMenu = document.getElementById(controlId+"-menu")!.contains(element)
    return eventIsOnMenu
}

export const DropdownContext = createContext<DropdownContextType | null>(null)
export const DropdownContextProvider = ({children, value}:{children: React.ReactNode, value:DropdownContextType}) => {
    return (
        <DropdownContext.Provider value={value}>
            {children}
        </DropdownContext.Provider>
    )
}
export const useDropdownContext = () => {
    const context = useContext(DropdownContext)
    if(!context) {
        throw new Error(
            "useDropdownContext has to be used within DropdownContextProvider!"
        )
    }
    return context
}


const Dropdown = forwardRef<HTMLDivElement, DropdownType>((
        {
            children, className, onSelect, onToggle, controlId, navDropdown=false,
            drop="down", align="start", autoClose=true, show="default", ...restProps
        }, ref) => {
    
    const [showInternal, setShowInternal] = useState<boolean>(show === "default" ? false : show as boolean)

    // this is an object like {index: string} because we need it to rerender even if the case is the same
    // aka we use a "next/previous" case to navigate through the dropdown menu so need to rerender consecutive "next" cases
    const [activeDescendant, setActiveDescendant] = useState<{case:string}>({case:""})

    const internalOnToggle = useCallback((event: MouseEvent) => {
        event.stopPropagation()
        setShowInternal(prev => !prev)
    }, [])
    
    const contextValue  = useMemo(() => ({
        align, 
        drop, 
        showInternal: show != "default" && onToggle ? show as boolean : showInternal, 
        handleToggle: show != "default" && onToggle ? onToggle : internalOnToggle, 
        controlId: controlId, 
        activeDescendant, 
        setActiveDescendant,
        navDropdown:navDropdown
    }), [align, drop, show, showInternal, onToggle, controlId, activeDescendant, setActiveDescendant, navDropdown])

    let computedClassName = `sg-dropdown${className? " "+className:""}`
    computedClassName += navDropdown ? " sg-nav-item" : ""
    
    return (
        <div id={controlId+"-wrapper"} ref={ref} className={computedClassName}  data-nav={navDropdown ? "true":null} {...restProps} >
            <DropdownContextProvider value={contextValue}>
                {children}
            </DropdownContextProvider>
        </div>
    )
})
Dropdown.displayName = "Dropdown"


export const Toggle = forwardRef<HTMLAnchorElement | HTMLButtonElement, DropdownToggleType>( ({children, className, as="button", variant="primary", ...restProps}, ref) => {
    const { controlId, handleToggle, setActiveDescendant, showInternal, navDropdown, drop } = useDropdownContext()
    const Component = as
    const handleKeyPress = (event: KeyboardEvent) => {
        let flag = false
        console.log(event.key)
        switch (event.key) {
            case "ArrowDown":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({...prev, case:"next"}))
                }
                else {
                    handleToggle(event)
                    setActiveDescendant(prev => ({...prev, case:"first"}))
                }
                break
            case "ArrowUp":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({...prev, case:"previous"}))
                } else {
                    handleToggle(event)
                    setActiveDescendant(prev => ({...prev, case:"last"}))
                }
                break
            case "Home":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({...prev, case:"first"}))
                }
                break
            case "End":
                flag = true
                if(showInternal) {
                    setActiveDescendant(prev => ({...prev, case:"last"}))
                }
                break
            case "Tab":
                if(showInternal) {
                    handleToggle(event)
                }
                break
            case "Escape":
                flag = true
                if(showInternal) {
                    handleToggle(event)
                }
                break
            case "Enter":
            case " ":
                if(showInternal) {
                    flag = true
                    const activeElement = document.querySelector(".sg-dropdown-item-visual-focus") as HTMLElement
                    activeElement.click()
                    handleToggle(event)
                    break
                }
                else {
                    setActiveDescendant(prev => ({...prev, case:"first"}))
                    break
                }
        }
        if(flag) {
            event.stopPropagation()
            event.preventDefault()
        }
    }
    const handleClick = (event: MouseEvent) => {
        if(!showInternal) return
        if((event.target as HTMLElement).id === controlId) return

        if(!isEventOnMenu(event, controlId)) {
            handleToggle(event)
        }
        else if(isEventOnMenu(event, controlId)) {
            handleToggle(event)
            const toggleElement: HTMLElement | null = document.getElementById(controlId)
            toggleElement?.focus()
        }
    }
    useEffect(() => {
        const toggleElement: HTMLElement = document.getElementById(controlId) as HTMLElement
        toggleElement.addEventListener("keydown", handleKeyPress, true)
        document.addEventListener("mouseup", handleClick, true)
        return function cleanup() {
            toggleElement.removeEventListener("keydown", handleKeyPress, true)
            document.removeEventListener("mouseup", handleClick, true)
        }
    }, [handleKeyPress, controlId])

    const toggleButtonClick = (event: MouseEvent) => {
        handleToggle(event)
        if(!showInternal) {
            setActiveDescendant(prev => ({...prev, case:"first"}))
        }
    }
    
    let classNamesComputed = `sg-button sg-button${variant ? "-"+variant:"-primary"} sg-dropdown-toggle${className ? " "+className:""}`
    if (Component === "a" || navDropdown) {
        classNamesComputed = `sg-nav-dropdown-toggle sg-dropdown-toggle${className ? " "+className:""}`
    }
    return (
        <Component tabIndex="0" type="button" aria-haspopup="true" aria-controls={controlId+"-menu"} aria-expanded={showInternal} id={controlId}
            ref={ref} className={classNamesComputed} data-drop={drop}
            onClick={(event: MouseEvent) => toggleButtonClick(event)} {...restProps}
        >
            {children}
        </Component>
    )
})
Toggle.displayName = "DropdownToggle"


export const Menu = forwardRef<HTMLUListElement, DropdownMenuType>( ({children, className, style = {}, ...restProps}, ref) => {
    const { controlId, showInternal, activeDescendant, navDropdown, align, drop } = useDropdownContext()
    const [ computedStyle, setComputedStyle ] = useState({})
    useLayoutEffect(() => {
        if(showInternal) {
            const basePosition = getDropdownMenuPlacement(controlId, drop, align)
            const menu = document.getElementById(controlId+"-menu") as HTMLElement

            setComputedStyle(basePosition)
        }
    }, [showInternal])
    
    useEffect(() => {
        const handleResize = (event: UIEvent) => {
            const basePosition = getDropdownMenuPlacement(controlId, drop, align)    
            setComputedStyle(basePosition)
        }
        if(showInternal) {
            const menu = document.getElementById(controlId+"-menu") as HTMLElement
            const menuChildren = document.getElementById(controlId+"-menu")!.children
            const menuChildrenLast = menuChildren.length - 1
            const elementWithVisualFocus = document.querySelector(".sg-dropdown-item-visual-focus")
            let currentIndex = 0, currentChild = menuChildren[0].children[0]
            if(elementWithVisualFocus != null) {
                elementWithVisualFocus.classList.remove("sg-dropdown-item-visual-focus")
                for(let i=0; i<menuChildren.length; i++) {
                    if(menuChildren[i] === elementWithVisualFocus.parentElement) {
                        currentIndex = i
                        break
                    }
                }
            }
            switch (activeDescendant.case) {
                case "first":
                    currentChild = menuChildren[0].children[0]
                    currentIndex = 0
                    break
                case "last":
                    currentChild = menuChildren[menuChildrenLast].children[0]
                    currentIndex = menuChildrenLast
                    break
                case "next":
                    currentIndex = currentIndex === menuChildrenLast ? 0 : currentIndex + 1
                    currentChild = menuChildren[currentIndex].children[0]
                    break
                case "previous":
                    currentIndex = currentIndex === 0 ? menuChildrenLast : currentIndex - 1
                    currentChild = menuChildren[currentIndex].children[0]
                    break
            }
            menu.setAttribute("aria-activedescendant", currentChild.id)
            menuChildren[currentIndex].children[0].classList.add("sg-dropdown-item-visual-focus")

            //makes it so that the menu stays with the button
            window.addEventListener("resize", handleResize, true)
        } else {
            const menu = document.getElementById(controlId+"-menu") as HTMLElement
            menu.setAttribute("aria-activedescendant", "")
        }
        return function cleanup() {
            window.removeEventListener("resize", handleResize, true)
        }
    }, [controlId, showInternal, activeDescendant])

    const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        let active=target.classList.contains("sg-dropdown-item-visual-focus")
        const menu = document.getElementById(controlId+"-menu") as HTMLElement
        if(active) {
            return
        } else {
            document.querySelector(".sg-dropdown-item-visual-focus")?.classList.remove("sg-dropdown-item-visual-focus")
            menu.setAttribute("aria-activedescendant", "")
            target.classList.add("sg-dropdown-item-visual-focus")
            menu.setAttribute("aria-activedescendant", target.id)
        }
    }
    useEffect(() => {
        const menu = document.getElementById(controlId+"-menu") as HTMLElement
        for (let i=0; i< menu.children.length; i++) {
            (menu.children[i] as HTMLElement).addEventListener("mouseover", handleMouseOver, true)
        }
        return function cleanup() {
            for (let i=0; i< menu.children.length; i++) {
                (menu.children[i] as HTMLElement).addEventListener("mouseover", handleMouseOver, true)
            }
        }
    }, [])
    return (
        <ul id={controlId+"-menu"} role="menu" tabIndex={-1} aria-labelledby={controlId} data-navdropdown={navDropdown ? "true":"false"}
            ref={ref} className={`sg-dropdown-list${className ? " "+className:""}${showInternal ? " show":""}`}
            style={{...computedStyle, ...style}} {...restProps}
        >
            {children}
        </ul>
    )
})
Menu.displayName = "DropdownMenu"


export const Item = forwardRef<HTMLAnchorElement | HTMLButtonElement, DropdownItemType>( ({children, as="button", className, ...restProps}, ref) => {
    const { navDropdown } = useDropdownContext()
    const Component = navDropdown ? "a" : as
    return (
        <li role="none">
            <Component ref={ref} role="menuitem" tabIndex="-1" className={`sg-dropdown-item${className ? " "+className:""}`} {...restProps}>
                {children}
            </Component >
        </li>
    )
})
Item.displayName = "DropdownItem"

export const Divider = forwardRef<HTMLHRElement, DropdownDividerType>( ({className="", ...restProps}, ref) => {
    return (
        <hr ref={ref} className={`.sg-dropdown-divider${className}`} {...restProps}></hr>
    )
})
Divider.displayName = "DropdownDivider"

export default  Object.assign(Dropdown, {
    Toggle: Toggle,
    Menu: Menu,
    Item: Item,
    //Text: Text,
    Divider: Divider
})