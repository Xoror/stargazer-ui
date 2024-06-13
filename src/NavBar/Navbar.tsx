import React, { createContext, forwardRef, useContext, useMemo } from "react";

import { NavbarBrandType, NavbarTextType, NavbarType, NavbarContextType } from "./Navbar.types";

export const NavbarContext = createContext<NavbarContextType>(null)

const NavbarContextProvider = ({children, value}:{children:React.ReactNode, value:NavbarContextType}) => {
    return (
        <NavbarContext.Provider value={value}>
            {children}
        </NavbarContext.Provider>
    )
}
export const useNavbarContext = () => {
    const context = useContext(NavbarContext)
    return context
}

const Navbar = forwardRef<HTMLElement, NavbarType>(({children, className, navbarPrefix= "sg-navbar-", ...restProps}, ref) => {
    const navbarContext = useMemo(() => {
        return navbarPrefix
    }, [navbarPrefix])

    return (
        <nav ref={ref} className={`sg-navbar${className ? " "+className:""}`} {...restProps}>
            <NavbarContextProvider value={navbarContext}>
                {children}
            </NavbarContextProvider>
        </nav>
    )
})
Navbar.displayName = "Navbar"

const Brand = forwardRef<HTMLAnchorElement | HTMLElement, NavbarBrandType>( ({children, className, href="#", as="a", ...restProps}, ref) => {
    const Component = as || (href && as != "Link" ? 'a' : 'span')
    return (
        <Component ref={ref} href={href} className={`sg-navbar-brand${className ? " "+className:""}`} {...restProps} >
            {children}
        </Component>
    )
})
Brand.displayName = "NavbarBrand"

const Text = forwardRef<HTMLElement, NavbarTextType>( ({children, className, as="span", ...restProps}, ref) => {
    const Component = as
    return (
        <Component ref={ref} className={`sg-navbar-text${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
})
Text.displayName = "NavbarText"

export default  Object.assign(Navbar, {
    Brand: Brand,
    Text: Text
})