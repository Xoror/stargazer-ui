import { createContext, forwardRef, useContext, useEffect, useMemo, useState } from "react"

const getButtonIndex = (event, controlID) => {
    const buttons = document.getElementById(controlID+"-controls").children
    for (let key of Object.keys(buttons)) {
        if(buttons[key] === event.target) {
            return key
        }
    }
}

const TabContext = createContext(null)
const TabContextProvider = ({children, value}) => {
    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    )
}

const Tabs = forwardRef(({children, className, controlID, activeClassName, defaultActive=0, ...restProps}, ref) => {
    const [activeTab, setActiveTab] = useState(defaultActive)
    const [pageCount, setPageCount] = useState(null)
    
    useEffect(() => {
        let active = activeClassName
        if(!active) {
            active = "sg-active"
        }
        const activeTabElement = document.getElementsByClassName(active)[0]
        const activeButtonElement = document.getElementsByClassName(active)[1]
        
        if(activeTabElement) {
            activeTabElement.classList.remove(active)
        }
        if(activeButtonElement) {activeButtonElement.classList.remove(active)}

        const controlsChildren = document.getElementById(controlID+"-controls").children
        const contentChildren = document.getElementById(controlID+"-content").children
        
        controlsChildren[activeTab].classList.add(active)
        contentChildren[activeTab].classList.add(active)

    }, [activeTab, controlID, activeClassName, setPageCount])

    const contextValue = useMemo(() => ({
        activeTab,
        setActiveTab,
        controlID,
        pageCount,
        setPageCount
    }), [activeTab, setActiveTab, controlID, pageCount, setPageCount])
    return (
        <TabContextProvider value={contextValue}>
            <div ref={ref} id={controlID+"-tabs"} className={`sg-tabs${className ? " "+className: ""}`} {...restProps}>
                {children}
            </div>
        </TabContextProvider>
    )
})

const Controls = ({children, className, ...restProps}, ref) => {
    const { controlID, setPageCount } = useContext(TabContext)
    useEffect(() => {
        setPageCount(children.length)
    }, [children, setPageCount])
    return (
        <div ref={ref} id={controlID+"-controls"} className={`sg-tabs-controls${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
}
Tabs.Controls = forwardRef(Controls)

const Button = ({children, className, onClick, ...restProps}, ref) => {
    const { controlID, setActiveTab } = useContext(TabContext)
    const handleClick = (event) => {
        setActiveTab(getButtonIndex(event, controlID))
        if(onClick) {
            onClick(event)
        }
    }
    return (
        <button ref={ref} onClick={handleClick} className={`sg-tabs-button${className ? " "+className:""}`} {...restProps}>
            {children}
        </button>
    )
}
Tabs.Button = forwardRef(Button)

const Content = ({children, className, ...restProps}, ref) => {
    const { controlID } = useContext(TabContext)
    return (
        <div ref={ref} id={controlID+"-content"} className={`sg-tabs-content${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
}
Tabs.Content = forwardRef(Content)

const Page = ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-tabs-page${className ? " "+className:""}`} {...restProps}>
            {children}
        </div>
    )
}
Tabs.Page = forwardRef(Page)

export { Tabs }