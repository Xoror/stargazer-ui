import React, {  forwardRef } from "react"
import { ButtonGroupType } from "./ButtonGroup.types"

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupType>( ({ children, className, vertical=false, ...restProps}, ref) => {
    return (
        <div ref={ref} role="group" className={`sg-button-group${vertical ? "-vertical" : ""}${className ? " "+className : ""}`} {...restProps}>
            {children}
        </div>
    )
})

export default ButtonGroup