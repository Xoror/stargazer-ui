import { ReactNode } from "react";

import { BaseDivType } from "../utils/BaseTypes";

export type InputGroupType = {
    children: ReactNode,
    className?: string
} & BaseDivType

export type InputGroupText = {
    children: ReactNode,
    className?: string
}