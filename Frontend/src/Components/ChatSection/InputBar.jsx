import React, { useState } from "react";
import MessageSendIcon from '../../assets/icons/message_send_icon.svg?react'
import { useDispatch, useSelector } from "react-redux";
import { selectMessages, addMessage } from "../../store/messageSlice";
import { selectedConversation } from "../../store/conversationSlice";
import { toast } from "react-toastify";
import summaryApi from "../../common";

const InputBar = () => {
  const [sendMessageData, setSendMessageData] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const selectedFriend = useSelector(selectedConversation);
  const messages = useSelector(selectMessages)
  //console.log("selectedFriend from inputBar", selectedFriend);
  

  const handleSendMessage = async() => {
    try {
      setLoading(true);
      const response = await fetch(`${summaryApi.sendMessage.url}/${selectedFriend?._id}`,{
        method : summaryApi.sendMessage.method,
        credentials : 'include',
        headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            message : sendMessageData,
          }),
      });

      const dataResponse = await response.json();

      if(dataResponse.success){
        //console.log("dataResponse", dataResponse?.data?.message);
        
        dispatch(addMessage(dataResponse.data))
        setSendMessageData("")
        //console.log("messages", messages);
        
      }

  
    } catch (error) {
      toast.error("An error occurred while sending message.");
      console.log("error in InputBar component", error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
  <div className="bg-Octonary h-full flex rounded-sm shadow-md">
    <div className="flex h-full w-full p-1">
      <input type="text" 
      className="w-full h-full outline-none px-2" 
      placeholder="Type a message"
      value={sendMessageData} 
      onChange={(e) => setSendMessageData(e.target.value)}
      />
    </div>
      <div className="flex items-center pr-2" onClick={handleSendMessage}>
        <MessageSendIcon className="w-8 h-auto cursor-pointer fill-Quinary"/>
      </div>
  </div>
)
};

export default InputBar;
