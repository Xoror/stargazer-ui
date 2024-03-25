import { ReactNode } from "react";

import { BaseDialogType, BaseDivType, BaseHeadingType, BaseSpanType } from "../utils/BaseTypes"

export type ModalContextType = Function | null

export type ModalType = {
    children:ReactNode,
    className?: string,
    id?: string,
    centered?: boolean,
    size?: string,
    show: boolean,
    backdrop?: string,
    onHide: Function,
} & BaseDialogType

export type ModalHeaderType = {
    children: ReactNode,
    as?: React.ElementType,
    className?: string,
    closeButton?: boolean
    onClick?: (event: React.MouseEvent) => void,
} & (BaseDivType | BaseHeadingType | BaseSpanType)

export type ModalTitleType = {
    children: ReactNode,
    as?: React.ElementType,
    className?: string
} & (BaseDivType | BaseHeadingType | BaseSpanType)

export type ModalBodyType = {
    children: ReactNode,
    className?: string,
} & BaseDivType

export type ModalFooterType = {
    children: ReactNode,
    className?: string,
} & BaseDivType

export type ErrorModalType = {
    typeCheck: {
        show: boolean,
        onHide: boolean
    },
    closeModal: Function
}