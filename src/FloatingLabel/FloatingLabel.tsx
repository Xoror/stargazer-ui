import React, { forwardRef, useMemo } from "react";

import { FormContextProvider } from "../Form/Form";
import { FormContextType } from "../Form/Form.types";
import { FloatingLabelType } from "./FloatingLabel.types";

const FloatingLabel = forwardRef<HTMLLabelElement, FloatingLabelType>( ({children, label, controlId, className, htmlFor,...restProps}, ref) => {
    const context = useMemo<FormContextType>(() => {
        return {controlId: controlId}
    }, [controlId])
    return (
        <FormContextProvider value={context} >
            <div className={`sg-form-floating`}>
                {children}
                <label ref={ref} htmlFor={controlId} className="sg-form-floating-label" {...restProps}>{label}</label>
            </div>
        </FormContextProvider>
    )
})

export default FloatingLabel