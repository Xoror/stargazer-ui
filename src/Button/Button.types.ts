import { ReactNode } from "react"
import { BaseButtonType } from "../utils/BaseTypes"

export type ButtonType = {
    children: ReactNode
    variant?: string,
    className?: string,
} & BaseButtonType