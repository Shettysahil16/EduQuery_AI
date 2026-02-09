import React, { useEffect, useRef, useState } from "react";
import MessageSendIcon from "../../assets/icons/message_send_icon.svg?react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, updateMessageStatus } from "../../store/messageSlice";
import { selectedConversation } from "../../store/conversationSlice";
import { selectUser } from "../../store/userSlice";
import { toast } from "react-toastify";
import summaryApi from "../../common";
import { useSocket } from "../../Context/Socket/useSocket";
import { allSortedUsers, setAllSortedUsers } from "../../store/allUsersSlice";
import sentSound from "../../assets/audio/message_sent_sound.mp3";

const InputBar = ({ conversationId }) => {
  //console.log("conversationId inside inputbar", conversationId);

  const [sendMessageData, setSendMessageData] = useState("");
  const [loading, setLoading] = useState(false);
  const { socketRef } = useSocket();
  const socket = socketRef.current;
  const typingTimeout = useRef(null);
  const messageSentSound = useRef(new Audio(sentSound));
  const textareaRef = useRef(null);

  const dispatch = useDispatch();
  const selectedFriend = useSelector(selectedConversation);
  const loggedUser = useSelector(selectUser);
  const allUsers = useSelector(allSortedUsers);

  //const messages = useSelector(selectMessages)
  //console.log("sortedUsers after sending message", allUsers);

  const handleSendMessage = async () => {
    if (!sendMessageData || !sendMessageData.trim()) return;

    const tempId = Date.now();

    dispatch(
      addMessage({
        _id: tempId,
        conversationId: conversationId,
        senderId: loggedUser._id,
        receiverId: selectedFriend._id,
        message: sendMessageData,
        status: "sending",
        createdAt: new Date().toISOString(),
      }),
    );

    try {
      setLoading(true);
      const response = await fetch(summaryApi.sendMessage.url, {
        method: summaryApi.sendMessage.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: sendMessageData,
          receiverIds: [selectedFriend?._id],
        }),
      });

      const dataResponse = await response.json();
      console.log("lastMessage", dataResponse.data);

      if (dataResponse.success) {
        const receiverIndex = allUsers.findIndex(
          (user) => user._id === selectedFriend._id,
        );
        //console.log("receiverId", receiverIndex);

        if (receiverIndex === -1) return;

        const newSortedUsers = allUsers.filter(
          (_, index) => index !== receiverIndex,
        );
        //console.log("newSortedUsers", newSortedUsers);
        const lastMessageData = Array.isArray(dataResponse.data)
          ? dataResponse.data[0] // first message
          : dataResponse.data;

        const updatedReceiver = {
          ...allUsers[receiverIndex],
          lastMessage: { ...lastMessageData, status: "sent" },
        };

        dispatch(setAllSortedUsers([updatedReceiver, ...newSortedUsers]));
        dispatch(
          updateMessageStatus({
            convId: conversationId,
            tempId,
            messageId: dataResponse.data._id,
            updates: { ...dataResponse.data, status: "sent" },
          }),
        );
        messageSentSound.current.play();
        setSendMessageData("");
        //console.log("messages", messages);
      }
    } catch (error) {
      toast.error("An error occurred while sending message.");
      console.log("error in InputBar component", error);
    } finally {
      setLoading(false);
    }
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto"; // reset
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`; // max height
  };

  const handleOnChange = (e) => {
    setSendMessageData(e.target.value);
    autoResizeTextarea();

    if (socket && selectedFriend) {
      socket.emit("typing", {
        senderId: loggedUser._id,
        receiverId: selectedFriend._id,
      });

      if (typingTimeout.current) clearTimeout(typingTimeout.current);

      typingTimeout.current = setTimeout(() => {
        socket.emit("stop-typing", {
          senderId: loggedUser._id,
          receiverId: selectedFriend._id,
        });
      }, 2000);
    }
  };

  useEffect(() => {
  textareaRef.current?.focus();
}, [conversationId]);


  return (
    <div className="bg-Octonary flex rounded-sm shadow-md">
      <div className="flex w-full p-1">
        <textarea
          ref={textareaRef}
          rows={1}
          className="w-full resize-none overflow-y-auto outline-none px-2 py-2 bg-transparent scrollbar-custom"
          placeholder="Type a message"
          value={sendMessageData}
          onChange={handleOnChange}
        />
      </div>
      <div className="flex items-center pr-2" onClick={handleSendMessage}>
        <MessageSendIcon className="w-8 h-auto cursor-pointer fill-Quinary" />
      </div>
    </div>
  );
};

export default InputBar;
