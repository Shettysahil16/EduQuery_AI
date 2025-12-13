import { useContext } from "react";
import SideBarPanelContext from "./SideBarPanelProvider";

export const useSideBarPanel = () => {
  const context = useContext(SideBarPanelContext);
  if (!context) {
    throw new Error(
      "useSideBarPanel must be used inside SideBarPanelProvider"
    );
  }
  return context;
};