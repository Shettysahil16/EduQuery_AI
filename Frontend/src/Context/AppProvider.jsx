import {SideBarPanelProvider} from "./SideBarPanel/SideBarPanelProvider";

export const AppProvider = ({ children }) => {
  return (
        <SideBarPanelProvider>
          {children}
        </SideBarPanelProvider>
  );
};
