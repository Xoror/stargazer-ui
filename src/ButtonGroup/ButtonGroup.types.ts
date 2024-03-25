import { ReactNode } from "react"
import { BaseDivType } from "../utils/BaseTypes"

export type ButtonGroupType = {
    children: ReactNode,
    className?: string,
    vertical?: boolean,
} & BaseDivType