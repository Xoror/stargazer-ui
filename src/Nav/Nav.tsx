import React, { forwardRef } from "react";

import { NavType, NavItemType, NavLinkType } from "./Nav.types";

import { useNavbarContext } from "../NavBar/Navbar";

const Nav = forwardRef<HTMLElement, NavType>(({children, className, as="ul", ...restProps}, ref) => {
    const Component = as
    const navbarContext = useNavbarContext()
    const navbarPrefix = navbarContext ? navbarContext : "sg-navbar-"

    return (
        <Component ref={ref} className={`${className} ${navbarPrefix}nav`} {...restProps}>
            {children}
        </Component>
    )
})
Nav.displayName = "Nav"

const Item = forwardRef<HTMLElement, NavItemType>( ({children, className, as="li", ...restProps}, ref) => {
    const Component = as
    return (
        <Component role="none" ref={ref} className={`sg-nav-item${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
})
Item.displayName = "NavItem"

const Link = forwardRef<HTMLElement, NavLinkType>( ({children, className, as="a", ...restProps}, ref) => {
    const Component = as
    return (
        <Component role="menuitem" ref={ref} className={`sg-nav-link${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
})
Link.displayName = "NavLink"

export default  Object.assign(Nav, {
    Item: Item,
    Link: Link
})