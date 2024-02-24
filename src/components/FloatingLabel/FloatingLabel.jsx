import React, { forwardRef, useMemo } from "react";

import { FormContext } from "../Form/Form";

const FloatingLabel = forwardRef( ({children, label, controlId, ...restProps}, ref) => {
    const context = useMemo(() => {
        return {controlId: controlId}
    })
    return (
        <FormContext.Provider value={context} >
            <div className={`sg-form-floating`}>
                {children}
                <label ref={ref} htmlFor={context.controlId} className="sg-form-floating-label" {...restProps}>{label}</label>
            </div>
        </FormContext.Provider>
    )
})

export { FloatingLabel }