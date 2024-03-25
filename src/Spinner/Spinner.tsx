import React, { forwardRef } from "react";

import { SpinnerType } from "./Spinner.types";

const Spinner = forwardRef<HTMLDivElement, SpinnerType>( ({size="1em", color="white", label, className, controlId, ...restProps}, ref) => {
    return (
        <>
            <div aria-labelledby={controlId} role="status" ref={ref} className={`sg-spinner${className ? " "+className : ""}`} style={{width:size, height:size, borderColor:color}} {...restProps}></div>
            <label id={controlId} className="sg-visually-hidden">{label}</label>
        </>
    )
})

export default Spinner