import React, { forwardRef } from "react"

import { InputGroupText, InputGroupType } from "./InputGroup.types"

const InputGroup = forwardRef<HTMLDivElement, InputGroupType>(({children, className,  ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-input-group${className ? " "+className : ""}`} {...restProps}>
            {children}
        </div>
    )
})

const Text = forwardRef<HTMLSpanElement, InputGroupText>( ({children, className, ...restProps}, ref) => {
    return (
        <span ref={ref} className={`sg-input-group-text${className ? " "+className : ""}`} {...restProps}>
            {children}
        </span>
    )
})

export default  Object.assign(InputGroup, {
    Text: Text
})