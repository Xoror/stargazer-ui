import { ReactNode, Dispatch, Children } from "react";

import { BaseDivType, BaseFormType, BaseInputType, BaseLabelType, BaseLItemType, BaseSelectType, BaseSmallType, BaseUListType } from "../utils/BaseTypes";

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

// Form Select types
export type SelectContextType = {
    showList: boolean,
    setShowList: Dispatch<React.SetStateAction<boolean>>,
    activeDescendant: string,
    setActiveDescendant: Dispatch<React.SetStateAction<string>>,
    inputValue: string, 
    setInputValue: Dispatch<React.SetStateAction<string>>
}
export type FormSelectType = {
    children: ReactNode,
    className?: string,
    id?: string,
} & BaseDivType // BaseSelectType
export type FormSelectControlType = {
    children?: ReactNode,
    className?: string,
    placeholder?: string,
    searchable?: boolean,
    inputRef?: React.Ref<HTMLInputElement>,
    inputOptions?: FormSelectInputType
} & BaseDivType
export type FormSelectInputType = {
    className?: string,
    id?: string
} & BaseInputType
export type FormSelectListType = {
    children: ReactNode,
    className?: string,
    id?: string
} & BaseUListType
export type FormSelectListItemType = {
    children: ReactNode,
    className?: string,
    id?: string,
    value?: string
} & BaseLItemType


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