import React from "react";
import { TableType } from "./Table.types";
declare const Table: React.ForwardRefExoticComponent<Omit<TableType, "ref"> & React.RefAttributes<HTMLTableElement>>;
export default Table;
