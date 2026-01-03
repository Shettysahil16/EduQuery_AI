import messageModel from "../models/messageModel.js";
import conversationModel from "../models/conversationModel.js";
import userModel from "../models/userModel.js";
import { io, getReceiverSocketId } from "../SocketIO/server.js";

const sendMessageController = async (req, res) => {
  try {
    const { message } = req.body;
    const senderId = req.userId;
    const { id: receiverId } = req.params;

    const senderUser = await userModel.findById(senderId);

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
    console.log("newMessage", newMessage);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("new-message", {
        ...newMessage.toObject(),
        senderName : senderUser.fullName
      });
    }

    if (newMessage) {
      await newMessage.save();
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    return res.status(201).json({
      message: "message sent successfully",
      data: newMessage,
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
