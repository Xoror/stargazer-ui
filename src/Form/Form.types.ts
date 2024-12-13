import { ReactNode, Dispatch, Children, ReactElement } from "react";

import { BaseElementType, BaseElementType2, BaseParagraphType, BaseDivType, BaseFormType, BaseInputType, BaseLabelType, BaseLItemType, BaseSelectType, BaseSpanType, BaseSliderType, BaseSmallType, BaseUListType, BaseSVGType, BaseButtonType } from "../utils/BaseTypes";

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
    activeDescendant: any,
    setActiveDescendant: Dispatch<React.SetStateAction<any>>,
    inputValue: string, 
    setInputValue: Dispatch<React.SetStateAction<string>>,
    selectedDescendant: any
    setSelectedDescendant: Dispatch<React.SetStateAction<any>>,
    children: ReactNode
}
export type FormSelectTagType = {
    children: ReactNode,
    className?: string,
    id?: string,
    required?: boolean,
    value?: any,
    error?: ErrorMessageType,
    errorAsOverlay?: boolean
    hint?: HintMessageType
} & BaseSelectType

export type FormSelectType =  {
    children: ReactNode,
    className?: string,
    id?: string,
    required?: boolean,
    value?: any,
    error?: ErrorMessageType,
    errorAsOverlay?: boolean
    hint?: HintMessageType
} & FormSelectControlType
export type FormSelectControlType = {
    children?: ReactNode,
    required?: boolean,
    className?: string,
    placeholder?: string,
    searchable?: boolean,
    value: any,
    label: ReactNode
} & BaseButtonType

export type FormSelectInputType = {
    className?: string,
    id?: string
} & BaseInputType
export type FormSelectListType = {
    children: ReactNode,
    className?: string,
    id?: string
} & BaseUListType
export type FormSelectOptionType = {
    children?: ReactNode,
    className?: string,
    value: string,
    disabled?: boolean,
    label?: string,
    selected?: boolean,
    type?: string
} & BaseLItemType & BaseElementType


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