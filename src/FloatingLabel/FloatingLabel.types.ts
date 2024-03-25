import { ReactNode } from "react";

import { BaseLabelType } from "../utils/BaseTypes";

export type FloatingLabelType = {
    children: ReactNode,
    className?:string,
    htmlFor?:string,
    label: string,
    controlId: string
} & BaseLabelType