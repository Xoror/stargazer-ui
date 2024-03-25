import React, { forwardRef } from "react"

import { CardBodyType, CardFooterType, CardHeaderType, CardTextType, CardType } from "./Card.types"

const Card = forwardRef<HTMLDivElement, CardType>( ({children, className, variant, inverted=false,...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-card${className ? " "+className:""}${variant ? " "+variant:""}${inverted ? " inverted":""}`} {...restProps}>
            {children}
        </div>
    )
})

const Header = forwardRef<HTMLDivElement | HTMLHeadingElement | HTMLSpanElement, CardHeaderType>( ({as="div", className, children, ...restProps}, ref) => {
    let validAs = ["div", "span", "h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "div"

    return (
        <Component ref={ref} className={`sg-card-header ${className}`} {...restProps}>
            {children}
        </Component>
    )
})

const Title = forwardRef<HTMLHeadingElement, CardHeaderType>(({as="h5", className, children, ...restProps}, ref) => {
    let validAs = ["h1", "h2", "h3", "h4", "h5", "h6"]
    let Component = validAs.find(valid => valid === as) ? as : "h5"
    return (
        <Component ref={ref} className={`sg-card-title${className ? " "+className : ""}`} {...restProps}>
            {children}
        </Component>
    )
})

const Body = forwardRef<HTMLDivElement, CardBodyType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-card-body ${className}`} {...restProps}>
            {children}
        </div>
    )
})

const Text = forwardRef<HTMLParagraphElement, CardTextType>( ({children, className, ...restProps}, ref) => {
    return (
        <p ref={ref} className={`sg-card-text ${className}`} {...restProps}>
            {children}
        </p>
    )
})

const Footer = forwardRef<HTMLDivElement, CardFooterType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-card-footer ${className}`} {...restProps}>
            {children}
        </div>
    )
})

export default  Object.assign(Card, {
    Header: Header,
    Body: Body,
    Title: Title,
    Text: Text,
    Footer: Footer
})