import { BaseButtonType, BaseDivType } from "../utils/BaseTypes"

export type TabsContextType = {
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    controlId: string,
    activeClass: string
}

export type TabsType = {
    children: React.ReactNode,
    className?: string,
    controlId: string,
    activeClassName?: string,
    defaultActive: string,
} & BaseDivType

export type TabsControlsType = {
    children: React.ReactNode,
    className?: string,
} & BaseDivType

export type TabsButtonType = {
    children: React.ReactNode,
    className?: string,
    onClick?: Function,
    tabId: string,
    id?: string,
} & BaseButtonType

export type TabsContentType = {
    children: React.ReactNode,
    className?: string,
} & BaseDivType

export type TabsPageType = {
    children: React.ReactNode,
    className?: string,
    tabId: string,
} & BaseDivType