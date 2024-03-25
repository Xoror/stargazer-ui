import { ReactNode } from "react";

import { BaseAnchorType, BaseElementType, BaseNavType } from "../utils/BaseTypes";

export type NavbarContextType = string | null

export type NavbarType = {
    children: ReactNode,
    className?: string,
    navbarPrefix?: string,
} & BaseNavType

export type NavbarBrandType = {
    children: ReactNode,
    className?: string,
    as?: React.ElementType,
    href?: string
} & (BaseAnchorType | BaseElementType)

export type NavbarTextType = {
    children: ReactNode,
    className?: string,
    as?: React.ElementType
} & BaseElementType