import { ReactNode } from "react";

import { BaseDivType, BaseLabelType } from "../utils/BaseTypes";

export type InputGroupType = {
    children: ReactNode,
    className?: string,
    controlId: string
} & BaseDivType

export type InputGroupText = {
    children: ReactNode,
    className?: string,
    htmlFor?: string,
    as?: string
} & BaseLabelType

export type InputGroupGridType = {
    children: ReactNode,
    className?:string,

} & BaseDivType