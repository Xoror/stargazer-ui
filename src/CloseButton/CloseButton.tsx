import React, { forwardRef } from "react"

import { CloseButtonType } from "./CloseButton.types"

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonType>( ({className, variant = false, ...restProps}, ref) => {
    return (
        <button ref={ref} className={`sg-button-close${variant ? " sg-button-close-white" : ""} ${className}`} {...restProps}>
            <span className="sg-close-visually-hidden-label">Close</span>
        </button>
    )
})
CloseButton.displayName = "CloseButton"

export default CloseButton