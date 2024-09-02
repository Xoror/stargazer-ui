import React, { forwardRef } from "react"

import { ButtonType } from "./Button.types"

import mergeClassnames from "../utils/MergeClassnames"

const Button = forwardRef<HTMLButtonElement, ButtonType>( ({children, variant="primary", className, ...rest}, ref) => {
    const variants = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"] //["red", "blue", "yellow", "green", "purple"]
    const variantTest = variants.find(variantTest => variantTest === variant) ? variant : "primary"
    const computedClassnames = mergeClassnames("sg-button", `sg-button-${variantTest}`, className)
    return(
        <button ref={ref} type="button" className={computedClassnames} {...rest}>
            {children}
        </button>
    )
} )

Button.displayName = "Button"

export default Button
