import { SideBarPanelProvider } from "./SideBarPanel/SideBarPanelProvider";
import { AuthProvider } from "./Auth/AuthProvider";
import { SocketProvider } from "./Socket/SocketProvider";

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <SideBarPanelProvider>{children}</SideBarPanelProvider>
      </SocketProvider>
    </AuthProvider>
  );
};
