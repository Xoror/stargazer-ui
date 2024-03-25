import { ReactNode } from "react";
import { BaseAnchorType, BaseElementType, BaseNavType } from "../../BaseTypes";
export type NavbarType = {
    children: ReactNode;
    className?: string;
    navbarPrefix?: string;
} & BaseNavType;
export type NavbarBrandType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
    href?: string;
} & (BaseAnchorType | BaseElementType);
export type NavbarTextType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
} & BaseElementType;
