import { ReactNode } from "react"

import { BaseUListType, BaseLItemType } from "../utils/BaseTypes"

export type FormContextType = {
    depth: number,
    tree: boolean,
}

export type ListType = {
    children: ReactNode
} & BaseUListType

export type ListItem = {
    chilren: ReactNode
} & BaseLItemType