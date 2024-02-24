import { useState, forwardRef } from "react"

const ToggleButton = forwardRef( ({children, toggled="false", onClick, ...restProps}, ref) => {
    const [ toggledInternal, setToggledInternal ] = useState(toggled)
    const handleClick = (event) => {
        setToggledInternal(prev => {
            if(prev === "true") {return "false"}
            else {return "true"}
        })
        if(onClick) {
            onClick(event)
        }
    }
    return (
        <button onClick={handleClick} toggled={toggledInternal} {...restProps}>
            {children}
        </button>
    )
})

export { ToggleButton }