import { ReactNode } from "react";

import { BaseDivType, BaseFormType, BaseInputType, BaseLabelType, BaseSelectType, BaseSmallType } from "../utils/BaseTypes";

export type FormContextType = {
    controlId: string
}

export type FormType = {
    children: ReactNode
} & BaseFormType

export type FormControlType = {
    as?: React.ElementType,
    className?: string,
    plaintext?: boolean,
    id?: string,
    type?: string,
    autoFocus?: boolean
} & BaseInputType

export type FormSelectType = {
    children: ReactNode,
    className?: string,
    id?: string,
} & BaseSelectType

export type FormGroupType = {
    children: ReactNode,
    className?: string,
    controlId: string,
} & BaseDivType

export type FormLabelType = {
    children: ReactNode,
    className?: string,
    htmlFor?: string
} & BaseLabelType

export type FormCheckType = {
    classNameContainer?:string,
    containerRef?:React.LegacyRef<HTMLDivElement>,
    containerId?: string,
    style?: React.CSSProperties,
    classNameLabel?: string,
    labelRef?: React.LegacyRef<HTMLLabelElement>,
    label?: string,
    labelId?: string,
    className?: string,
    type?: string,
    controlId?: string,
    reverse?: boolean,
    checkStyle?: React.CSSProperties
} & BaseInputType

export type FormTextType = {
    children: ReactNode,
    className?: string,
} & BaseSmallType