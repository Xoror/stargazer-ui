import React, { useState, forwardRef } from "react"

import { ToggleButtonType } from "./ToggleButton.types"

const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonType>( ({children, toggled="false", onClick, ...restProps}, ref) => {
    const [ toggledInternal, setToggledInternal ] = useState<boolean>(toggled === "true" ? true : false)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setToggledInternal(prev => !prev)
        if(onClick) {
            onClick(event)
        }
    }
    return (
        <button onClick={(event) => handleClick(event)} data-toggled={toggledInternal} {...restProps}>
            {children}
        </button>
    )
})

export default ToggleButton