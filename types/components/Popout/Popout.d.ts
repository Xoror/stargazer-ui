import React from "react";
import { PopoutType, PopoutBodyType, PopoutFooterType, PopoutTextType, PopoutTitleType } from "./Popout.types";
declare const _default: React.ForwardRefExoticComponent<Omit<PopoutType, "ref"> & React.RefAttributes<HTMLDialogElement>> & {
    Header: React.ForwardRefExoticComponent<(Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    } & React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>, "ref"> | Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    } & React.ClassAttributes<HTMLHeadingElement> & React.HTMLAttributes<HTMLHeadingElement>, "ref"> | Omit<{
        children: React.ReactNode;
        className?: string | undefined;
        as?: React.ElementType<any, keyof React.JSX.IntrinsicElements> | undefined;
    } & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>, "ref">) & React.RefAttributes<HTMLDivElement | HTMLHeadingElement | HTMLSpanElement>>;
    Title: React.ForwardRefExoticComponent<Omit<PopoutTitleType, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
    Body: React.ForwardRefExoticComponent<Omit<PopoutBodyType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Text: React.ForwardRefExoticComponent<Omit<PopoutTextType, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<Omit<PopoutFooterType, "ref"> & React.RefAttributes<HTMLDivElement>>;
};
export default _default;
