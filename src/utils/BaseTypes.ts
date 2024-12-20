import React from "react";

type BaseAnchorType = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;
type BaseButtonType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type BaseDialogType = React.DetailedHTMLProps<React.DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>;
type BaseDivType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
type BaseFormType = React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
type BaseHeadingType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>;
type BaseInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type BaseHrType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLHRElement>, HTMLHRElement>;
type BaseLabelType = React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>;
type BaseLItemType = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>;
type BaseMeterType = React.DetailedHTMLProps<React.MeterHTMLAttributes<HTMLMeterElement>, HTMLMeterElement>;
type BaseNavType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type BaseParagraphType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>;
type BaseProgressBarType = React.DetailedHTMLProps<React.ProgressHTMLAttributes<HTMLProgressElement>, HTMLProgressElement>;
type BaseSelectType = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>;
type BaseSliderType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type BaseSmallType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type BaseSpanType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;
type BaseSVGType = React.SVGProps<SVGSVGElement>
type BaseTableType = React.DetailedHTMLProps<React.TableHTMLAttributes<HTMLTableElement>, HTMLTableElement>;
type BaseUListType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>;

type BaseElementType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
type BaseElementType2 = React.DetailedHTMLProps<React.HTMLAttributes<Element>, Element>;

export { 
    BaseAnchorType, BaseButtonType, BaseDialogType, BaseDivType, BaseElementType, BaseElementType2, BaseFormType, BaseHeadingType, BaseHrType,
    BaseInputType, BaseLItemType, BaseLabelType, BaseSliderType, BaseMeterType, BaseNavType, BaseParagraphType, BaseProgressBarType, BaseSelectType, BaseSmallType, BaseSpanType,
    BaseSVGType, BaseTableType, BaseUListType
}