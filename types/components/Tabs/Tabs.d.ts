import React from "react";
import { TabsButtonType, TabsContentType, TabsControlsType, TabsPageType, TabsType } from "./Tabs.types";
declare const _default: React.ForwardRefExoticComponent<Omit<TabsType, "ref"> & React.RefAttributes<HTMLDivElement>> & {
    Controls: React.ForwardRefExoticComponent<Omit<TabsControlsType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Button: React.ForwardRefExoticComponent<Omit<TabsButtonType, "ref"> & React.RefAttributes<HTMLButtonElement>>;
    Content: React.ForwardRefExoticComponent<Omit<TabsContentType, "ref"> & React.RefAttributes<HTMLDivElement>>;
    Page: React.ForwardRefExoticComponent<Omit<TabsPageType, "ref"> & React.RefAttributes<HTMLDivElement>>;
};
export default _default;
