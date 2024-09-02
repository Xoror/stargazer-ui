import { ReactNode, Dispatch, Children } from "react";

import { BaseParagraphType, BaseDivType, BaseFormType, BaseInputType, BaseLabelType, BaseLItemType, BaseSelectType, BaseSpanType, BaseSliderType, BaseSmallType, BaseUListType, BaseSVGType } from "../utils/BaseTypes";

export type FormTagContextType = {
    noValidate: boolean
}
export type FormContextType = {
    controlId?: string,
    isInputGroup?: boolean,
    isFLoatingLabel?: boolean,
}

export type FormType = {
    children: ReactNode
} & BaseFormType

type ErrorMessageType = {
    message: string,
    type?: string,
    className?: string,
    style?: React.CSSProperties,
} & BaseParagraphType
type HintMessageType = {
    message: string,
    custom?: boolean,
    className?: string,
    style?: React.CSSProperties,
} & BaseParagraphType
export type ErrorType = {children?:  ReactNode} & ErrorMessageType
export type HintType = {children?: ReactNode} & HintMessageType
export type FormControlType = {
    as?: React.ElementType,
    className?: string,
    plaintext?: boolean,
    id?: string,
    type?: string,
    autoFocus?: boolean,
    error?: ErrorMessageType,
    errorAsOverlay?: boolean
    hint?: HintMessageType
} & BaseInputType

// Form Select types
export type SelectContextType = {
    internalId?:string,
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
    required?: boolean
} & (BaseSelectType & BaseDivType)
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
    vertical?: boolean
} & BaseDivType

export type FormLabelType = {
    children: ReactNode,
    className?: string,
    htmlFor?: string
} & BaseLabelType

export type FormCheckType = {
    children?: ReactNode,
    style?: React.CSSProperties,
    classNameContainer?:string,
    containerRef?:React.LegacyRef<HTMLDivElement>,
    containerId?: string,
    styleContainer?: React.CSSProperties,
    classNameLabel?: string,
    labelRef?: React.LegacyRef<HTMLLabelElement>,
    label?: string,
    labelId?: string,
    styleLabel?: React.CSSProperties,
    className?: string,
    type?: string,
    controlId?: string,
    reverse?: boolean,
} & BaseInputType

export type FormTextType = {
    children: ReactNode,
    className?: string,
} & BaseSmallType

export type FormSliderType = {
    children?: ReactNode,
    className?: string,
    style?: React.CSSProperties,
    controlId: string,
    min?: number,
    max?: number,
    step?: number,
    defaultValue?: number,
    value: number,
    onChange(value :number): () => any
} & BaseSpanType // BaseSliderType
export type SliderContextType = {
    children: ReactNode,
    controlId: string,
    min?: number,
    max?: number,
    step?: number
}

export type WarningIconType = {
    alt?: string,
    size?: string | number,
    color?: string
} & BaseSVGType