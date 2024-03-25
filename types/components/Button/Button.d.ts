import React from "react";
import { ButtonType } from "./Button.types";
declare const Button: React.ForwardRefExoticComponent<Omit<ButtonType, "ref"> & React.RefAttributes<HTMLButtonElement>>;
export default Button;
