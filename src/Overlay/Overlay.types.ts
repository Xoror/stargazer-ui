import { ReactNode } from "react"
import { BaseDivType } from "../utils/BaseTypes"

export type OverlayType = {
    children: ReactNode,
    overlay: React.JSX.Element,
    show?: boolean,
    onToggle?: Function,
    position?: string,
    trigger?: string | string[],
    defaultShow?: boolean
} & BaseDivType

export type PositionObject = {
    top?: number, 
    bottom?: number, 
    left?: number, 
    right?:number
}