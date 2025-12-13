import { useState, createContext } from "react";

const SideBarPanelContext = createContext(null);

export const SideBarPanelProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => setIsOpen(true);
  const closeSidebar = () => setIsOpen(false);

  return (
    <SideBarPanelContext.Provider value={{ isOpen, openSidebar, closeSidebar }}>
      {children}
    </SideBarPanelContext.Provider>
  );
};

export default SideBarPanelContext; // export the context if needed
