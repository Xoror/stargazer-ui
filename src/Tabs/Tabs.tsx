import React, { createContext, forwardRef, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"

import { TabsButtonType, TabsContentType, TabsContextType, TabsControlsType, TabsPageType, TabsType, TabsScrollButtonType } from "./Tabs.types"

import mergeClassnames from "../utils/MergeClassnames"
import mergeRefs from "../utils/MergeRefs"
import { useScreenSize } from "../hooks"

const TabsContext = createContext<TabsContextType | null>(null)
const TabsContextProvider = ({children, value}:{children: React.ReactNode, value: TabsContextType}) => {
    return (
        <TabsContext.Provider value={value}>
            {children}
        </TabsContext.Provider>
    )
}
const useTabsContext = () => {
    const context = useContext(TabsContext)
    if(!context) {
        throw new Error(
            "useTabContext has to be used within a TabContextProvider!"
        )
    }
    return context
}

const Tabs = forwardRef<HTMLDivElement, TabsType>(({children, className, controlId, activeClassName, defaultActive, active, onTabChange, ...restProps}, ref) => {
    const [activeTab, setActiveTab] = useState<string>(defaultActive)
    const activeClass= activeClassName ? activeClassName: "sg-active"
    if(active && activeTab != active) {
        setActiveTab(active)
    }

    if(active && !onTabChange || !active && onTabChange) {
        throw new Error(
            "If you control the tabs externally, you need both an 'active' state and a function 'onTabChange' that controls the 'active' state!"
        )
    }
    
    const contextValue = useMemo(() => ({
        activeTab,
        setActiveTab,
        controlId,
        activeClass,
        onTabChange
    }), [activeTab, activeClass, controlId, activeClass, onTabChange])
    return (
        <TabsContextProvider value={contextValue}>
            <div ref={ref} id={controlId+"-tab-wrapper"} className={`sg-tabs${className ? " "+className: ""}`} {...restProps}>
                {children}
            </div>
        </TabsContextProvider>
    )
})
Tabs.displayName = "Tabs"

const ScrollButton = forwardRef<HTMLButtonElement, TabsScrollButtonType>( ({className, left = true, controlsRef, style, ...restProps}, ref) => {
    const internalRef = useRef<HTMLButtonElement>(null)

    const handleScrollBy = () => {
        if(!controlsRef || !controlsRef.current) return

        const tabControls = controlsRef.current
        const toScroll = (left ? -1 : 1) * 32
        tabControls.scrollBy(toScroll, 0)
    }
 
    let scrollIntervalId: NodeJS.Timeout
    const handlePointerDown = (event: React.MouseEvent<HTMLButtonElement>) => {
        clearInterval(scrollIntervalId)
        scrollIntervalId = setInterval(handleScrollBy, 20)
    }
    const handlePointerUp = (event: React.MouseEvent<HTMLButtonElement>) => {
        clearInterval(scrollIntervalId)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement> ) => {
        if(event.key === "Space" || event.key === "Enter") {
            clearInterval(scrollIntervalId)
            scrollIntervalId = setInterval(handleScrollBy, 20)
            return
        }
        clearInterval(scrollIntervalId)
    }
    const handleKeyUp = (event: React.KeyboardEvent<HTMLButtonElement> ) => {
        clearInterval(scrollIntervalId)
    }


    
    return (
        <button 
            type="button" ref={mergeRefs([ref, internalRef])} data-position={left ? "left":"right"} 
            onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}
            className={mergeClassnames("sg-tabs-button", "sg-tabs-scroll-button", className)}
            {...restProps} >
            <span className="visually-hidden">Scroll tab controls {left ? "left":"right"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                <polyline 
                    points={left ? "144 88 104 128 144 168" : "112 88 152 128 112 168" } //168 64 104 128 168 192
                    fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32"
                />
            </svg>
        </button>
    )
})

const Controls = forwardRef<HTMLDivElement, TabsControlsType>( ({children, className, ...restProps}, ref) => {
    const { controlId, activeClass } = useTabsContext()
    const [ isOverflow, setIsOverflow ] = useState(false)
    const internalRef = useRef<HTMLDivElement>(null)

    const checkWidthOverflow = () => {
        if(!internalRef.current) return

        const el = internalRef.current
        setIsOverflow(el.clientWidth < el.scrollWidth)
    }
    useLayoutEffect(() => {
        console.log(internalRef.current)
        checkWidthOverflow()
    }, [children])
    useEffect(() => {
        window.addEventListener("resize", checkWidthOverflow, true)
        return function cleanup() {
            window.removeEventListener("resize", checkWidthOverflow, true)
        }
    }, [])
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key
        const tabsControls = internalRef.current
        if(tabsControls) {
            const tabControlsChildren = Array.from(tabsControls.children) as HTMLElement[]
            let newIndex
            if(key === "ArrowRight" || key === "ArrowLeft") {
                event.preventDefault()
                const activeTab = document.querySelector(".sg-tabs-button"+"."+activeClass) as HTMLElement
                const activeTabIndex = tabControlsChildren.indexOf(activeTab)
                const indexChange = key === "ArrowRight" ? 1 : -1
                newIndex = activeTabIndex + indexChange < 0 ? tabControlsChildren.length - 1 : (activeTabIndex + indexChange >= tabControlsChildren.length ? 0 : activeTabIndex + indexChange)
            } else if (key === "Home" || key === "End") {
                event.preventDefault()
                newIndex = key === "Home" ? 0 : tabControlsChildren.length -1
            }
            if(!newIndex) return
            tabControlsChildren[newIndex].focus()
            tabControlsChildren[newIndex].click()
        }
    }
//div style={{maxWidth:"100%", display:"flex", overflowX:"auto"}}
    return (
        <div tabIndex={-1} onKeyDown={(event) => handleKeyDown(event)} role="tablist" id={controlId+"-tab-controls"} ref={mergeRefs([ref, internalRef])} className={`sg-tabs-controls${className ? " "+className:""}`} {...restProps}>
            {isOverflow ? <ScrollButton controlsRef={internalRef} /> : null }
            {children}
            {isOverflow ? <ScrollButton controlsRef={internalRef} left={false}/> : null }
        </div>
    )
})
Controls.displayName = "TabsControl"

const Button = forwardRef<HTMLButtonElement, TabsButtonType>( ({children, className, onClick, tabId, id,...restProps}, ref) => {
    const { activeTab, setActiveTab, activeClass, onTabChange } = useTabsContext()
    const isActiveTab = activeTab === tabId
    const classNameComputed = "sg-tabs-button" + (className ? " "+className:"") + (isActiveTab ? " "+activeClass : "")
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(onTabChange) {
            onTabChange(tabId)
        }
        else {
            setActiveTab(tabId)
        }
        if(onClick) {
            onClick(event)
        }
    }
    return (
        <button 
            role="tab" type="button" id={tabId+"-button"} ref={ref} onClick={event => handleClick(event)} className={classNameComputed} {...restProps}
            tabIndex={isActiveTab ? 0:-1} aria-selected={isActiveTab ? "true":"false"} aria-controls={tabId+"-page"}
        >
            {children}
        </button>
    )
})
Button.displayName = "TabsButton"

const Content = forwardRef<HTMLDivElement, TabsContentType>( ({children, className, ...restProps}, ref) => {
    return (
        <div role="none" ref={ref} className={`sg-tabs-content${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
})
Content.displayName = "TabsContent"

const Page = forwardRef<HTMLDivElement, TabsPageType>( ({children, className, tabId, ...restProps}, ref) => {
    const { activeTab, activeClass } = useTabsContext()
    const classNameComputed = "sg-tabs-page" + (className ? " "+className:"") + (activeTab === tabId ? " "+activeClass : "")
    return (
        <div 
            role="tabpanel" id={tabId+"-page"} aria-labelledby={tabId+"-button"}
            ref={ref} className={classNameComputed} {...restProps}
        >
            {children}
        </div>
    )
})
Page.displayName = "TabsPage"

export default  Object.assign(Tabs, {
    Controls: Controls,
    Button: Button,
    Content: Content,
    Page: Page,
})