import { ReactNode } from "react";
import { BaseTableType } from "../../BaseTypes";
export type TableType = {
    children: ReactNode;
    size?: string;
    className?: string;
} & BaseTableType;
