import { ReactNode } from "react";
import { BaseDivType, BaseHeadingType, BaseSpanType, BaseParagraphType } from "../../BaseTypes";
export type CardType = {
    children: ReactNode;
    className?: string;
} & BaseDivType;
export type CardHeaderPossible = BaseDivType | BaseSpanType | BaseHeadingType;
export type CardHeaderType = {
    children: ReactNode;
    className?: string;
    as?: React.ElementType;
} & CardHeaderPossible;
export type CardBodyType = {
    children: ReactNode;
    className?: string;
} & BaseDivType;
export type CardTextType = {
    children: ReactNode;
    className?: string;
} & BaseParagraphType;
export type CardFooterType = {
    children: ReactNode;
    className?: string;
} & BaseDivType;
