import React from "react";
import { DropdownContextType, DropdownDividerType, DropdownMenuType, DropdownType } from "./Dropdown.types";
export declare const DropdownContext: React.Context<DropdownContextType | null>;
export declare const DropdownContextProvider: ({ children, value }: {
    children: React.ReactNode;
    value: DropdownContextType;
}) => React.JSX.Element;
export declare const useDropdownContext: () => DropdownContextType;
export declare const Toggle: React.ForwardRefExoticComponent<(Omit<{
    children: React.ReactNode;
    className?: string | undefined;
    navDropdown?: boolean | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    variant?: string | undefined;
} & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
    children: React.ReactNode;
    className?: string | undefined;
    navDropdown?: boolean | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    variant?: string | undefined;
} & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> | Omit<{
    children: React.ReactNode;
    className?: string | undefined;
    navDropdown?: boolean | undefined;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    variant?: string | undefined;
} & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export declare const Menu: React.ForwardRefExoticComponent<Omit<DropdownMenuType, "ref"> & React.RefAttributes<HTMLUListElement>>;
export declare const Item: React.ForwardRefExoticComponent<(Omit<{
    children: React.ReactNode;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    className?: string | undefined;
} & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
    children: React.ReactNode;
    as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    className?: string | undefined;
} & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
export declare const Divider: React.ForwardRefExoticComponent<Omit<DropdownDividerType, "ref"> & React.RefAttributes<HTMLHRElement>>;
declare const _default: React.ForwardRefExoticComponent<Omit<DropdownType, "ref"> & React.RefAttributes<HTMLDivElement>> & {
    Toggle: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        navDropdown?: boolean | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        variant?: string | undefined;
    } & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        navDropdown?: boolean | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        variant?: string | undefined;
    } & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "ref"> | Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        navDropdown?: boolean | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        variant?: string | undefined;
    } & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
    Menu: React.ForwardRefExoticComponent<Omit<DropdownMenuType, "ref"> & React.RefAttributes<HTMLUListElement>>;
    Item: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
    Divider: React.ForwardRefExoticComponent<Omit<DropdownDividerType, "ref"> & React.RefAttributes<HTMLHRElement>>;
};
export default _default;
