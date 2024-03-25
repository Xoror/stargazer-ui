import React, { createContext, forwardRef, useContext, useMemo, useState } from "react"

import { TabsButtonType, TabsContentType, TabsContextType, TabsControlsType, TabsPageType, TabsType } from "./Tabs.types"

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

const Tabs = forwardRef<HTMLDivElement, TabsType>(({children, className, controlId, activeClassName, defaultActive, ...restProps}, ref) => {
    const [activeTab, setActiveTab] = useState<string>(defaultActive)
    const activeClass= activeClassName ? activeClassName: "sg-active"
    
    const contextValue = useMemo(() => ({
        activeTab,
        setActiveTab,
        controlId,
        activeClass
    }), [activeTab, setActiveTab, controlId])
    return (
        <TabsContextProvider value={contextValue}>
            <div ref={ref} id={controlId+"-tab-wrapper"} className={`sg-tabs${className ? " "+className: ""}`} {...restProps}>
                {children}
            </div>
        </TabsContextProvider>
    )
})

const Controls = forwardRef<HTMLDivElement, TabsControlsType>( ({children, className, ...restProps}, ref) => {
    const { controlId, activeClass } = useTabsContext()
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        const key = event.key
        const tabsControls = document.getElementById(controlId+"-tab-controls")
        if(tabsControls) {
            const tabControlsChildren = Array.from(tabsControls.children) as HTMLElement[]
            if(key === "ArrowRight" || key === "ArrowLeft") {
                event.preventDefault()
                const activeTab = document.querySelector(".sg-tabs-button"+"."+activeClass) as HTMLElement
                const activeTabIndex = tabControlsChildren.indexOf(activeTab)
                const indexChange = key === "ArrowRight" ? 1 : -1
                const newIndex = activeTabIndex + indexChange < 0 ? tabControlsChildren.length - 1 : (activeTabIndex + indexChange >= tabControlsChildren.length ? 0 : activeTabIndex + indexChange)
                tabControlsChildren[newIndex].focus()
                tabControlsChildren[newIndex].click()
            } else if (key === "Home" || key === "End") {
                event.preventDefault()
                const newIndex = key === "Home" ? 0 : tabControlsChildren.length -1
                tabControlsChildren[newIndex].focus()
                tabControlsChildren[newIndex].click()
            }
        }
    }

    return (
        <div onKeyDown={(event) => handleKeyDown(event)} role="tablist" id={controlId+"-tab-controls"} ref={ref} className={`sg-tabs-controls${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
})

const Button = forwardRef<HTMLButtonElement, TabsButtonType>( ({children, className, onClick, tabId, id,...restProps}, ref) => {
    const { activeTab, setActiveTab, activeClass } = useTabsContext()
    const classNameComputed = "sg-tabs-button" + (className ? " "+className:"") + (activeTab === tabId ? " "+activeClass : "")
    const isActiveTab = activeTab === tabId
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setActiveTab(tabId)
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

const Content = forwardRef<HTMLDivElement, TabsContentType>( ({children, className, ...restProps}, ref) => {
    return (
        <div role="none" ref={ref} className={`sg-tabs-content${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
})

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

export default  Object.assign(Tabs, {
    Controls: Controls,
    Button: Button,
    Content: Content,
    Page: Page,
})