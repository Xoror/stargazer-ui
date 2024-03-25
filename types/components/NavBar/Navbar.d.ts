import React from "react";
import { NavbarTextType, NavbarType } from "./Navbar.types";
export type NavbarContextType = string | null;
export declare const NavbarContext: React.Context<NavbarContextType>;
export declare const useNavbarContext: () => NavbarContextType;
declare const _default: React.ForwardRefExoticComponent<Omit<NavbarType, "ref"> & React.RefAttributes<HTMLElement>> & {
    Brand: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        href?: string | undefined;
    } & React.ClassAttributes<HTMLAnchorElement> & React.AnchorHTMLAttributes<HTMLAnchorElement>, "ref"> | Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        href?: string | undefined;
    } & React.ClassAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>, "ref">) & React.RefAttributes<HTMLAnchorElement | HTMLElement>>;
    Text: React.ForwardRefExoticComponent<Omit<NavbarTextType, "ref"> & React.RefAttributes<HTMLElement>>;
};
export default _default;
