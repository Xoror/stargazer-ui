import React, { createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from 'react-dom';

import { DropdownContextType, DropdownItemType, DropdownDividerType, DropdownMenuType, DropdownToggleType, DropdownType } from "./Dropdown.types";
import mergeRefs from "../utils/MergeRefs";
//automatic menu placement function

const getDropdownMenuPlacement = (controlId: string, drop: string="down", align: string="start") => {
    const dropPossible = ["down", "up", "right", "left"]
    const alignPossible = ["start", "end", "center"]
    const placement = (dropPossible.find(item => item === drop) ? drop : "down") + "-" + (alignPossible.find(item => item === align) ? align : "start")
    const button = document.getElementById(controlId)
    if(!button) return {}
    const {width: buttonWidth, height: buttonHeight, x: buttonLeft, y: buttonTop } = button.getBoundingClientRect()
    //console.log(buttonLeft)
    const menu = document.getElementById(controlId+"-menu")!
    const {width: menuWidth, height: menuHeight} = menu.getBoundingClientRect()

    const navbars = Array.from(document.querySelectorAll(".sg-navbar"))
    if(navbars) {
        for (const navbar of navbars) {
            if(navbar.contains(button)) {
                menu.style.setProperty("position", "absolute")
            }
        }
    }
    const position:React.CSSProperties = {}
    
    const offset = 2//"4px"
    switch(drop) {
        case "down":
            //position.top =  `calc(100% + ${offset})`
            position.top = buttonTop + buttonHeight + offset
            break
        case "up":
            //position.bottom =  `calc(100% + ${offset})`
            position.top = buttonTop - menuHeight - offset
            break
        case "right":
            //position.left =  `calc(100% + ${offset})`
            position.left = buttonLeft + buttonWidth + offset
            break
        case "left":
            //position.right =  `calc(100% + ${offset})`
            position.left = buttonLeft - menuWidth - offset
            break
    }
    switch (placement) {
        case "down-start":
        case "up-start":
            //position.left = -2
            position.left = buttonLeft
            break
        case "down-center":
        case "up-center":
            position.left = buttonLeft + -1 * (menuWidth - buttonWidth)/2
            break
        case "down-end":
        case "up-end":
            position.left = buttonLeft + -1 * (menuWidth - buttonWidth)
            break
        case "right-start":
        case "left-start":
            position.top = buttonTop
            break
        case "right-center":
        case "left-center":
            position.top = buttonTop + -1 * (menuHeight - buttonHeight)/2
            break
        case "right-end":
        case "left-end":
            position.top = buttonTop + -1 * (menuHeight - buttonHeight)
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


const Dropdown = forwardRef<HTMLButtonElement, DropdownType>((
        {
            children, className, onSelect, onToggle, controlId, navDropdown=false,
            drop="down", align="start", autoClose=true, show="default", 
            label, as="button", variant="primary", menuRef, menuProps,
             ...restProps
        }, ref) => {
    
    const [showInternal, setShowInternal] = useState<boolean>(show === "default" ? false : show as boolean)
    // this is an object like {index: string} because we need it to rerender even if the case is the same
    // aka we use a "next/previous" case to navigate through the dropdown menu so need to rerender consecutive "next" cases
    const [activeDescendant, setActiveDescendant] = useState<{case:string}>({case:""})

    const internalOnToggle = useCallback((event: MouseEvent) => {
        event.stopPropagation()
        //console.log("toggle")
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

    let computedClassName = className? className+" sg-dropdown" :"sg-dropdown"
    computedClassName += navDropdown ? " sg-nav-item" : ""
    
    return (
        <DropdownContextProvider value={contextValue}>
            <Toggle {...restProps} ref={ref} className={computedClassName} label={label} data-nav={navDropdown ? "true":null}>
                <Menu ref={menuRef} {...menuProps}>
                    {children}
                </Menu>
            </Toggle>
        </DropdownContextProvider>
    )
})
Dropdown.displayName = "Dropdown"


export const Toggle = forwardRef<HTMLButtonElement, DropdownToggleType>( ({
        children, className, as="button", variant="primary", label="add label",
        onClick, onBlur, ...restProps}, ref
    ) => {
    const internalRef = useRef(null)
    const { controlId, handleToggle, setActiveDescendant, showInternal, navDropdown, drop } = useDropdownContext()
    const Component = as
    const handleKeyPress = (event: KeyboardEvent) => {
        let flag = false
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

    const handleMouseUp = (event: MouseEvent) => {
        if(!showInternal) return
        if((event.target as HTMLElement).id === controlId) return

        if(!isEventOnMenu(event, controlId)) {
            handleToggle(event)
        }
        else if(isEventOnMenu(event, controlId)) {
            event.stopPropagation()
            handleToggle(event)
            const toggleElement: HTMLElement | null = document.getElementById(controlId)
            toggleElement?.focus()
        }
    }
    useEffect(() => {
        const toggleElement: HTMLElement = document.getElementById(controlId) as HTMLElement
        toggleElement.addEventListener("keydown", handleKeyPress, true)
        document.addEventListener("mouseup", handleMouseUp, true)
        return function cleanup() {
            toggleElement.removeEventListener("keydown", handleKeyPress, true)
            document.removeEventListener("mouseup", handleMouseUp, true)
        }
    }, [handleKeyPress, controlId])

    const toggleButtonClick = (event: keyof typeof onClick) => {
        handleToggle(event)
        if(!showInternal) {
            setActiveDescendant(prev => ({...prev, case:"first"}))
        }
        if(onClick) onClick(event)
    }
    const handleBlur = (event: keyof typeof onBlur) => {
        //handleToggle(event)
        if(onBlur) onBlur(event)
    }
    
    let classNamesComputed = `sg-button sg-button${variant ? "-"+variant:"-primary"} sg-dropdown-toggle${className ? " "+className:""}`
    if (Component === "a" || navDropdown) {
        classNamesComputed = `sg-nav-dropdown-toggle sg-dropdown-toggle${className ? " "+className:""}`
    }
    return (
        <button ref={mergeRefs([ref, internalRef])} tabIndex={0} type="button" aria-haspopup="true" aria-controls={controlId+"-menu"} aria-expanded={showInternal} id={controlId}
            className={classNamesComputed} data-drop={drop}
            onClick={toggleButtonClick} onBlur={handleBlur} {...restProps}
        >
            {label}
            {children}
        </button>
    )
})
Toggle.displayName = "DropdownToggle"

const isValidListElement = (elementList: HTMLCollection, startIndex: number, direction: "forward" | "backward" ) => {
    let testIndex = startIndex
    
    let count = 0
    let stop = false
    while(!stop) {
        const test1 = elementList[testIndex].children[0] ? true : false
        
        const liItem = elementList[testIndex]
        const test2 = getComputedStyle(liItem).getPropertyValue("display") != "none"
        const test3 = test1 ? getComputedStyle(liItem.children[0]).getPropertyValue("display") != "none" : false
        if(test1 && test2 && test3) {
            stop = true
            break
        }

        if(direction === "forward" && testIndex === elementList.length - 1) {
            testIndex = 0
        } else if (direction === "backward" && testIndex === 0) {
            testIndex = elementList.length - 1
        } else {
            testIndex += direction === "forward" ? 1 : -1
        }
        
        count += 1
        if(count >= 100) {
            stop = true
        }
    }
    
    return testIndex
}

export const Menu = forwardRef<HTMLUListElement, DropdownMenuType>( ({children, className, style = {}, ...restProps}, ref) => {
    const { controlId, showInternal, activeDescendant, navDropdown, align, drop } = useDropdownContext()
    const [ computedStyle, setComputedStyle ] = useState<React.CSSProperties>({})
    useLayoutEffect(() => {
        if(showInternal) {
            const basePosition = getDropdownMenuPlacement(controlId, drop, align)
            setComputedStyle(basePosition)
        }
    }, [showInternal, drop, align, controlId])
    const handleResize = (event: UIEvent | Event) => {
        const basePosition = getDropdownMenuPlacement(controlId, drop, align)    
        setComputedStyle(basePosition)
    }
    useEffect(() => {
        const controller = new AbortController()
        const signal = controller.signal
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
                    currentIndex = isValidListElement(menuChildren, 0, "forward")
                    currentChild = menuChildren[currentIndex].children[0]
                    break
                case "last":
                    currentIndex = isValidListElement(menuChildren, menuChildrenLast, "backward")
                    currentChild = menuChildren[currentIndex].children[0]
                    break
                case "next":
                    currentIndex = isValidListElement(menuChildren, currentIndex === menuChildrenLast ? 0 : currentIndex + 1, "forward")
                    currentChild = menuChildren[currentIndex].children[0]
                    break
                case "previous":
                    currentIndex = isValidListElement(menuChildren, currentIndex === 0 ? menuChildrenLast : currentIndex - 1, "backward")
                    currentChild = menuChildren[currentIndex].children[0]
                    break
            }
            menu.setAttribute("aria-activedescendant", currentChild.id)
            menuChildren[currentIndex].children[0].classList.add("sg-dropdown-item-visual-focus")

            //makes it so that the menu stays with the button
            window.addEventListener("resize", event => handleResize(event), {capture: true, signal})
            window.addEventListener("scroll", event => handleResize(event), {capture: true, signal})
        } else {
            const menu = document.getElementById(controlId+"-menu") as HTMLElement
            menu.setAttribute("aria-activedescendant", "")
        }
        return function cleanup() {
            controller.abort()
        }
    }, [controlId, showInternal, activeDescendant])

    const handleMouseOver = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        const active = target.classList.contains("sg-dropdown-item-visual-focus")
        const menuId = controlId+"-menu"
        const menu = document.getElementById(menuId) as HTMLElement
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
            if(menu.children[i].children[0]) { (menu.children[i] as HTMLElement).addEventListener("mouseover", handleMouseOver, true) }
        }
        return function cleanup() {
            for (let i=0; i< menu.children.length; i++) {
                if(menu.children[i].children[0]) { (menu.children[i] as HTMLElement).addEventListener("mouseover", handleMouseOver, true) }
            }
        }
    }, [])
    return (
        createPortal(
            <ul id={controlId+"-menu"} role="menu" tabIndex={-1} aria-labelledby={controlId} data-navdropdown={navDropdown ? "true":"false"}
                ref={ref} className={`sg-dropdown-list${className ? " "+className:""}${showInternal ? " show":""}`}
                style={{...computedStyle, ...style}} {...restProps}
            >
                {children}
            </ul>
        , document.body)
    )
})
Menu.displayName = "DropdownMenu"


export const Item = forwardRef<HTMLAnchorElement | HTMLButtonElement, DropdownItemType>( ({children, as="button", className, liProps, onClick, ...restProps}, ref) => {
    const { navDropdown, activeDescendant } = useDropdownContext()
    const Component = navDropdown ? "a" : as
    const handleClick = (event: React.MouseEvent<HTMLButtonElement> & React.MouseEvent<HTMLAnchorElement>) => {
        event.stopPropagation()
        event.preventDefault()
        if(onClick) onClick(event)
    }
    return (
        <li role="none" {...liProps}>
            <Component ref={ref} role="menuitem" tabIndex="-1" onClick={handleClick} className={`sg-dropdown-item${className ? " "+className:""}`} {...restProps}>
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

export default Object.assign(Dropdown, {
    Toggle: Toggle,
    Menu: Menu,
    Item: Item,
    //Text: Text,
    Divider: Divider
})