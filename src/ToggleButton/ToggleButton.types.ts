import { ReactNode } from "react"
import { BaseButtonType } from "../utils/BaseTypes"

export type ToggleButtonType = {
    children: ReactNode,
    toggled?: boolean,
    onClick?: <T>(event: T) => T
} & BaseButtonType