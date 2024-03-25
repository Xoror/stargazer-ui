import React from "react";
import { NavDropdownType } from "./NavDropdown.types";
declare const _default: React.ForwardRefExoticComponent<Omit<NavDropdownType, "ref"> & React.RefAttributes<HTMLDivElement>> & {
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
    Menu: React.ForwardRefExoticComponent<Omit<import("../Dropdown/Dropdown.types").DropdownMenuType, "ref"> & React.RefAttributes<HTMLUListElement>>;
    Item: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLButtonElement> & React.ButtonHTMLAttributes<HTMLButtonElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLButtonElement>>;
    Divider: React.ForwardRefExoticComponent<Omit<import("../Dropdown/Dropdown.types").DropdownDividerType, "ref"> & React.RefAttributes<HTMLHRElement>>;
};
export default _default;
