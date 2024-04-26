import { ReactNode } from "react"

import { BaseUListType, BaseLItemType, BaseSpanType } from "../utils/BaseTypes"

export type FormContextType = {
    depth?: number,
    tree?: boolean,
    draggable?: boolean
}

export type ListType = {
    children: ReactNode,
    className: string,
    depth: number,
    tree: boolean,
    dragdrop: boolean
} & BaseUListType

export type ListSublistType = {
    children: ReactNode,
    className: string
    depth: number
} & BaseLItemType

export type ListItemType = {
    children: ReactNode,
    className: string,
} & BaseLItemType

export type ListLabelType = {
    children: ReactNode,
    className: string,
    label: string
} & BaseSpanType