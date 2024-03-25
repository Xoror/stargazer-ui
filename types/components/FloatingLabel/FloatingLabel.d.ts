import React from "react";
import { FloatingLabelType } from "./FloatingLabel.types";
declare const FloatingLabel: React.ForwardRefExoticComponent<Omit<FloatingLabelType, "ref"> & React.RefAttributes<HTMLLabelElement>>;
export default FloatingLabel;
