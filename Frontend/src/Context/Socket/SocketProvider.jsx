import { useRef, createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const loggedUser = useSelector(selectUser);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (loggedUser && !socketRef.current) {
      const newSocket = io("http://localhost:5050", {
        query: {
          userId: loggedUser._id,
        },
      });
      socketRef.current = newSocket;

      newSocket.on("get-online", (users) => {
        setOnlineUsers(users);

        //console.log("online users", onlineUsers);
      });

      //setSocket(newSocket);

      return () => {
        socketRef.current?.disconnect();
        socketRef.current = null;
      };
    }
  }, [loggedUser?._id]);

  return (
    <SocketContext.Provider value={{ socketRef, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
