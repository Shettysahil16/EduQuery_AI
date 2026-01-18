import { useRef, createContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/userSlice";
import { io } from "socket.io-client";
import { updateMessageStatus } from "../../store/messageSlice";
import { selectMessages } from "../../store/messageSlice";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const loggedUser = useSelector(selectUser);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState(new Set());
  const dispatch = useDispatch();
  

  useEffect(() => {
    
    if (!loggedUser) return;

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

    newSocket.on("user-typing", ({ senderId }) => {
      setTypingUsers((prev) => new Set(prev).add(senderId));
    });

    newSocket.on("user-stop-typing", ({ senderId }) => {
      setTypingUsers((prev) => {
        const updated = new Set(prev);
        updated.delete(senderId);
        return updated;
      });
    });

    newSocket.on('message-delivered', ({conversationId, messageId}) => {
      console.log("message delivered");
      
      dispatch(updateMessageStatus({
        convId : conversationId,
        messageId : messageId,
        updates : {
          status : 'delivered'
        }
      }))
    })

    //setSocket(newSocket);

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [loggedUser]);

  return (
    <SocketContext.Provider value={{ socketRef, onlineUsers, typingUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
