import { ReactNode } from "react"
import { BaseDialogType, BaseDivType, BaseHeadingType, BaseParagraphType, BaseSpanType } from "../utils/BaseTypes"

export type PopoutType = {
    children: ReactNode,
    initialPosition?: {
        top?: number,
        bottom?: number,
        right?: number,
        left?: number
    },
    id?: string,
    resize?: boolean,
    move?: boolean,
} & BaseDialogType

export type PopoutHeaderType = {
    children: ReactNode,
    className?: string,
    as?: React.ElementType
} & (BaseDivType | BaseHeadingType | BaseSpanType)

export type PopoutTitleType = {
    children: ReactNode,
    className?: string,
    as?: React.ElementType
} & BaseHeadingType

export type PopoutBodyType = {
    children: ReactNode,
    className?: string,
} & BaseDivType

export type PopoutTextType = {
    children: ReactNode,
    className?: string,
} & BaseParagraphType

export type PopoutFooterType = {
    children: ReactNode,
    className?: string,
} & BaseDivType