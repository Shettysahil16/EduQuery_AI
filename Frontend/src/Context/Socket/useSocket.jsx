import { useContext } from "react";
import SocketContext from "./SocketProvider";

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
};
