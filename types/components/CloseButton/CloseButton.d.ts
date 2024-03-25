import React from "react";
import { CloseButtonType } from "./CloseButton.types";
declare const CloseButton: React.ForwardRefExoticComponent<Omit<CloseButtonType, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export default CloseButton;
