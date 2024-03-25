import React, { forwardRef } from "react"

import { ButtonType } from "./Button.types"

const Button = forwardRef<HTMLButtonElement, ButtonType>( ({children, variant="primary", className, ...rest}, ref) => {
    const variants = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"] //["red", "blue", "yellow", "green", "purple"]
    const variantTest = variants.find(variantTest => variantTest === variant) ? variant : "primary"
    return(
        <button ref={ref} type="button" className={`sg-button sg-button-${variantTest}${className ? "" : " "+className}`} {...rest}>
            {children}
        </button>
    )
} )

export default Button
