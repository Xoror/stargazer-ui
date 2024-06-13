import React, { forwardRef } from "react";

import { TableType } from "./Table.types";


const Table = forwardRef<HTMLTableElement, TableType>( ({children, size="lg", className, ...restProps}, ref) => {
    let classesComputed = `sg-table${className ? " "+className:""}${size === "sm" ? " "+"sg-table-sm":""}`
    return (
        <table ref={ref} className={classesComputed} {...restProps}>
            {children}
        </table>
    )
})
Table.displayName = "Table"

export default Table