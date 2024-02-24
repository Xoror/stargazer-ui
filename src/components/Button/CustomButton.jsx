import React, { forwardRef } from "react"

export const Button = forwardRef( ({variant="primary", children, className, ...rest}, ref) => {
    //let variants = ["primary", "secondary", "success", "info", "warning", "danger", "dark", "light"] //["red", "blue", "yellow", "green", "purple"]
   // let variantTest = variants.find(variantTest => variantTest === variant) ? variant : "primary"
    return(
        <button ref={ref} type="button" className={`sg-button sg-button-${variant}${className == undefined ? "" : " "+className}`} {...rest}>
            {children}
        </button>
    )
} )
