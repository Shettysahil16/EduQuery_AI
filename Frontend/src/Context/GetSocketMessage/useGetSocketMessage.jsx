import React, { useEffect } from "react";
import { useSocket } from "../Socket/useSocket";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../../store/messageSlice";
import { selectedConversation } from "../../store/conversationSlice";
import chatSound from "../../assets/audio/notification tone.mp3";
import notificationSound from "../../assets/audio/iphone notification.mp3";
import { toast, Slide } from "react-toastify";

const useGetSocketMessage = () => {
  const { socketRef } = useSocket();
  const dispatch = useDispatch();
  const selectedFriend = useSelector(selectedConversation);
  console.log("selected friend id", selectedFriend?._id);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    const handleNewMessage = (newMessage) => {
      console.log("newMessage", newMessage);
      console.log("sender friend id", newMessage?.senderId);

      const isSameFriend = selectedFriend?._id === newMessage?.senderId;

      dispatch(addMessage(newMessage));

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
  }, [socketRef, dispatch, selectedFriend]);

  return null;
};

export default useGetSocketMessage;
