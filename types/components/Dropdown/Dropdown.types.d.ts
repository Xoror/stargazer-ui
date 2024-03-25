import { ReactNode } from "react";
import { BaseDivType, BaseAnchorType, BaseButtonType, BaseUListType, BaseHrType, BaseElementType } from "../../BaseTypes";
export type DropdownContextType = {
    align: string;
    drop: string;
    showInternal: boolean;
    handleToggle: Function;
    placement: string;
    directionClasses?: {
        down?: string;
        'down-centered'?: string;
        up?: string;
        'up-centered'?: string;
        end?: string;
        start?: string;
    };
    controlId: string;
    activeDescendant: {
        case: string;
    };
    setActiveDescendant: React.Dispatch<React.SetStateAction<{
        case: string;
    }>>;
};
export type DropdownType = {
    children: ReactNode;
    className?: string;
    onSelect?: Function;
    onToggle?: Function;
    controlId: string;
    drop?: string;
    align?: string;
    autoClose?: boolean;
    show?: boolean;
} & BaseDivType;
export type DropdownToggleType = {
    children: ReactNode;
    className?: string;
    navDropdown?: boolean;
    as?: React.ElementType;
    variant?: string;
} & (BaseAnchorType | BaseButtonType | BaseElementType);
export type DropdownMenuType = {
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties | undefined;
} & BaseUListType;
export type DropdownItemType = {
    children: ReactNode;
    as?: React.ElementType;
    className?: string;
} & (BaseAnchorType | BaseButtonType);
export type DropdownDividerType = {
    className?: string;
} & BaseHrType;
