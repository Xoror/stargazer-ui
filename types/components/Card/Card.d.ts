import React from "react";
import { CardBodyType, CardFooterType, CardTextType, CardType } from "./Card.types";
declare const _default: React.ForwardRefExoticComponent<Omit<CardType, "ref"> & React.RefAttributes<HTMLDivElement>> & {
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
    Body: React.ForwardRefExoticComponent<Omit<CardBodyType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Title: React.ForwardRefExoticComponent<(Omit<{
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
    } & React.ClassAttributes<HTMLSpanElement> & React.HTMLAttributes<HTMLSpanElement>, "ref">) & React.RefAttributes<HTMLHeadingElement>>;
    Text: React.ForwardRefExoticComponent<Omit<CardTextType, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
    Footer: React.ForwardRefExoticComponent<Omit<CardFooterType, "ref"> & React.RefAttributes<HTMLDivElement>>;
};
export default _default;
