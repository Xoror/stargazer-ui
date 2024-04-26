import React, { forwardRef } from "react"

import { InputGroupText, InputGroupType } from "./InputGroup.types"

const InputGroup = forwardRef<HTMLDivElement, InputGroupType>(({children, className,  ...restProps}, ref) => {
    return (
        <div ref={ref} className={`sg-input-group${className ? " "+className : ""}`} {...restProps}>
            {children}
        </div>
    )
})

const Text = forwardRef<HTMLLabelElement, InputGroupText>( ({children, className, ...restProps}, ref) => {
    return (
        <label ref={ref} className={`sg-input-group-text${className ? " "+className : ""}`} {...restProps}>
            {children}
        </label>
    )
})

export default  Object.assign(InputGroup, {
    Text: Text
})