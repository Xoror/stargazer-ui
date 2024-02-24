import React, { forwardRef } from "react";

import { navbarContext } from "../NavBar/NavBar";

const Nav = forwardRef(({children, className, fill, justify, as="ul", ...restProps}, ref) => {
    const Component = as

    //let isNavbar = false
    let navbarPrefix = ""
    if(navbarContext) {
        navbarPrefix = "sg-navbar-"
        //isNavbar = navbar == null ? true : navbar
    }

    return (
        <Component role="menubar" ref={ref} className={`${className} ${navbarPrefix}nav`} {...restProps}>
            {children}
        </Component>
    )
})

const Item = ({children, className, as="li", ...restProps}, ref) => {
    const Component = as
    return (
        <Component role="none" ref={ref} className={`sg-nav-item${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
}
Nav.Item = forwardRef(Item)

const Link = ({children, className, as="a", ...restProps}, ref) => {
    const Component = as
    return (
        <Component role="menuitem" ref={ref} className={`sg-nav-link${className ? " "+className:""}`} {...restProps}>
            {children}
        </Component>
    )
}
Nav.Link = forwardRef(Link)

export{ Nav }