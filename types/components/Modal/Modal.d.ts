import React from "react";
import { ModalBodyType, ModalType } from "./Modal.types";
declare const _default: (({ children, centered, size, show, backdrop, onHide, className, id, ...restProps }: ModalType) => React.ReactPortal) & {
    Header: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
        closeButton?: boolean | undefined;
        onClick?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
    } & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
        closeButton?: boolean | undefined;
        onClick?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
    } & React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
        closeButton?: boolean | undefined;
        onClick?: ((event: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
    } & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>, "ref">) & React.RefAttributes<HTMLDivElement | HTMLHeadingElement | HTMLSpanElement>>;
    Title: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>, "ref"> | Omit<{
        children: React.ReactNode;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
        className?: string | undefined;
    } & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>, "ref">) & React.RefAttributes<HTMLDivElement | HTMLHeadingElement | HTMLSpanElement>>;
    Body: React.ForwardRefExoticComponent<Omit<ModalBodyType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Footer: React.ForwardRefExoticComponent<Omit<ModalBodyType, "ref"> & React.RefAttributes<HTMLDivElement>>;
};
export default _default;
export declare const useKeepElementFocused: (elementRef: React.RefObject<HTMLDialogElement>) => void;
