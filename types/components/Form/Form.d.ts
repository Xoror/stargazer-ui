import React from "react";
import { FormCheckType, FormContextType, FormControlType, FormGroupType, FormLabelType, FormSelectType, FormTextType, FormType } from "./Form.types";
export declare const FormContext: React.Context<FormContextType | null>;
export declare const FormContextProvider: ({ children, value }: {
    children: React.ReactNode;
    value: FormContextType;
}) => React.JSX.Element;
export declare const useFormContext: () => FormContextType;
declare const _default: React.ForwardRefExoticComponent<Omit<FormType, "ref"> & React.RefAttributes<HTMLFormElement>> & {
    Control: React.ForwardRefExoticComponent<Omit<FormControlType, "ref"> & React.RefAttributes<HTMLInputElement>>;
    Select: React.ForwardRefExoticComponent<Omit<FormSelectType, "ref"> & React.RefAttributes<HTMLSelectElement>>;
    Group: React.ForwardRefExoticComponent<Omit<FormGroupType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Label: React.ForwardRefExoticComponent<Omit<FormLabelType, "ref"> & React.RefAttributes<HTMLLabelElement>>;
    Check: React.ForwardRefExoticComponent<Omit<FormCheckType, "ref"> & React.RefAttributes<HTMLInputElement>>;
    Text: React.ForwardRefExoticComponent<Omit<FormTextType, "ref"> & React.RefAttributes<HTMLElement>>;
};
export default _default;
