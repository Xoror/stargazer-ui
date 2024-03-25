import { ReactNode } from "react";
import { BaseButtonType } from "../../BaseTypes";
export type ButtonType = {
    children: ReactNode;
    variant?: string;
    className?: string;
} & BaseButtonType;
