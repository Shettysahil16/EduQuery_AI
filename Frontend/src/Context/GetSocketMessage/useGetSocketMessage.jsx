import React, { useEffect } from "react";
import { useSocket } from "../Socket/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messageSlice";
import { selectedConversation } from "../../store/conversationSlice";
import chatSound from "../../assets/audio/notification tone.mp3";
import notificationSound from "../../assets/audio/iphone notification.mp3";
import { toast, Slide } from "react-toastify";
import { allSortedUsers, setAllSortedUsers } from "../../store/allUsersSlice";

const useGetSocketMessage = () => {
  const { socketRef } = useSocket();
  const dispatch = useDispatch();
  const selectedFriend = useSelector(selectedConversation);
  const allUsers = useSelector(allSortedUsers);
  //console.log("selected friend id", selectedFriend?._id);

  useEffect(() => {
    console.log("socket", socketRef.current);
    if (!socketRef.current) return;

    const socket = socketRef.current;

    
    const handleNewMessage = (newMessage) => {
      
      socket.emit('message-delivered', {conversationId : newMessage.conversationId, messageId : newMessage._id})

      const senderIndex = allUsers.findIndex(
        (m) => m._id === newMessage.senderId
      );

      if (senderIndex === -1) return;

      const updatedUsersList = allUsers.filter(
        (_, index) => index !== senderIndex
      );

      const senderUser = {
        ...allUsers[senderIndex],
        lastMessage: newMessage,
      };

      dispatch(setAllSortedUsers([senderUser, ...updatedUsersList]));
      dispatch(addMessage(newMessage));

      console.log("newMessage", newMessage);
      //console.log("sender friend id", newMessage?.senderId);

      const isSameFriend = selectedFriend?._id === newMessage?.senderId;

      if (!selectedFriend || !isSameFriend) {
        //console.log("message from", newMessage.senderName);
        setTimeout(() => {
          const notificationMsgSound = new Audio(notificationSound);
          notificationMsgSound.play();
        }, 800);

        toast(
          <span>
            New message from{" "}
            <span style={{ color: "green", fontWeight: "bold" }}>
              {newMessage.senderName}
            </span>
          </span>,
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
            transition: Slide,
          }
        );
      } else {
        setTimeout(() => {
          const chatMsgSound = new Audio(chatSound);
          chatMsgSound.play();
        }, 500);
      }
    };
    socket.on("new-message", handleNewMessage);

    return () => socket.off("new-message", handleNewMessage);
  }, [socketRef, dispatch, selectedFriend, allUsers]);

  return null;
};

export default useGetSocketMessage;
