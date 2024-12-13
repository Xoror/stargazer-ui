import { ReactNode, CSSProperties } from "react"
import { BaseDivType } from "../utils/BaseTypes"

export type OverlayType = {
    children: ReactNode,
    overlay?: React.JSX.Element,
    tooltip?: React.JSX.Element | string,
    show?: boolean,
    onToggle?: Function,
    position?: "auto" | "top" | "bottom" | "right" | "left",
    trigger?: string | string[],
    defaultShow?: boolean,
    tooltipClassname?: string,
    tooltipStyle?: CSSProperties, 
    arrowClassname?: string,
    arrowStyle?: CSSProperties
} & BaseDivType

export type PositionObject = {
    top?: number, 
    bottom?: number, 
    left?: number, 
    right?:number
}