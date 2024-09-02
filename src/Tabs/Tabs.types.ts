import { BaseButtonType, BaseDivType } from "../utils/BaseTypes"

export type TabsContextType = {
    activeTab: string,
    setActiveTab: React.Dispatch<React.SetStateAction<string>>,
    controlId: string,
    activeClass: string,
    onTabChange: Function | undefined,
    setQueryParam?: Function
}

export type TabsType = {
    children: React.ReactNode,
    className?: string,
    controlId: string,
    activeClassName?: string,
    defaultActive: string,
    active?: string,
    onTabChange?: Function,
    queryParam?: string, 
    setQueryParam?: Function
} & BaseDivType

export type TabsControlsType = {
    children: React.ReactNode,
    className?: string,
} & BaseDivType

export type TabsScrollButtonType = {
    className?: string,
    left?: boolean,
    controlsRef?: React.RefObject<HTMLDivElement>
} & BaseButtonType

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