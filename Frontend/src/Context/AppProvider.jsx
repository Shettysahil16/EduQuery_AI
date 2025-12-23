import { SideBarPanelProvider } from "./SideBarPanel/SideBarPanelProvider";
import { AuthProvider } from "./Auth/AuthProvider";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <SideBarPanelProvider>{children}</SideBarPanelProvider>
    </AuthProvider>
  );
};
