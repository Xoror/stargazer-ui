import React, { forwardRef, useMemo } from "react"

import { InputGroupText, InputGroupType, InputGroupGridType } from "./InputGroup.types"

import { FormContextProvider, useFormContext } from "../Form"
import { useClassname } from "../hooks"

const InputGroup = forwardRef<HTMLDivElement, InputGroupType>(({children, className, controlId,  ...restProps}, ref) => {
    const context = useMemo(() => {
        return {controlId: controlId, isInputGroup: true}
    }, [controlId])
    return (
        <div ref={ref} className={useClassname("sg-input-group", className)} {...restProps}>
            <FormContextProvider value={context}>
                {children}
            </FormContextProvider>
        </div>
    )
})
InputGroup.displayName = "InputGroup"

const Grid = forwardRef<HTMLDivElement, InputGroupGridType>( ({children, className, ...restProps}, ref) => {
    return (
        <div ref={ref} className={useClassname("sg-input-group-grid", className)}>
            {children}
        </div> 
    )
})
Grid.displayName = "InputGroupGrid"

const Text = forwardRef<HTMLLabelElement, InputGroupText>( ({children, className, htmlFor, ...restProps}, ref) => {
    const { controlId } = useFormContext()

    const computedHtmlFor = controlId ?? htmlFor
    return (
        <label ref={ref} htmlFor={computedHtmlFor} className={useClassname("sg-input-group-text", className)} {...restProps}>
            {children}
        </label>
    )
})
Text.displayName = "InputGroupText"

export default  Object.assign(InputGroup, {
    Text: Text,
    Grid: Grid
})