import messageModel from "../../models/Chat_Models/messageModel.js";
import conversationModel from "../../models/Chat_Models/conversationModel.js";
import userModel from "../../models/User_Model/userModel.js";
import { io, getReceiverSocketId } from "../../SocketIO/server.js";

const sendMessageController = async (req, res) => {
  try {
    const { message, receiverIds } = req.body;
    const senderId = req.userId;
    //const { id: receiverId } = req.params;

    const senderUser = await userModel.findById(senderId);

    const sentMessages = [];

    for (const receiverId of receiverIds) {
      let conversation = await conversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });

      if (!conversation) {
        conversation = await conversationModel.create({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new messageModel({
        conversationId: conversation?._id,
        senderId,
        receiverId,
        message,
      });
      //console.log("newMessage", newMessage);
      if (newMessage) {
        await newMessage.save();
        conversation.lastMessage = newMessage._id;
        await conversation.save();
      }
      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new-message", {
          ...newMessage.toObject(),
          senderName: senderUser.fullName,
          lastMessage: conversation.lastMessage,
        });
      }
      sentMessages.push(newMessage);
    }
    return res.status(201).json({
      message: "message sent successfully",
      data: sentMessages,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default sendMessageController;
