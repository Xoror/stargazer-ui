import React, { ReactNode } from "react";
import { BaseButtonType } from "../../BaseTypes";
type ToggleButtonType = {
    children: ReactNode;
    toggled?: boolean;
    onClick?: <T>(event: T) => T;
} & BaseButtonType;
declare const ToggleButton: React.ForwardRefExoticComponent<Omit<ToggleButtonType, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export default ToggleButton;
