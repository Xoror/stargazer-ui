import { ReactNode } from "react";
import { BaseAnchorType, BaseElementType, BaseLItemType, BaseUListType } from "../../BaseTypes";
export type NavType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
} & (BaseUListType | BaseElementType);
export type NavItemType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
} & (BaseLItemType | BaseElementType);
export type NavLinkType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
} & (BaseAnchorType | BaseElementType);
