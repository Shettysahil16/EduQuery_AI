import messageModel from "../models/messageModel.js";
import conversationModel from "../models/conversationModel.js";
import userModel from "../models/userModel.js"

const sendMessageController = async (req, res) => {
  try {
    const { message } = req.body
    const senderId = req.userId;
    const { id: receiverId } = req.params

    let conversation = await conversationModel.findOne({
        participants : {$all : [senderId, receiverId]},
    })

    if(!conversation){
        conversation = await conversationModel.create({
            participants : [senderId, receiverId]
        })
    }

    const newMessage = new messageModel({
        senderId,
        receiverId,
        message
    })

    if(newMessage){
        await newMessage.save();
        conversation.messages.push(newMessage._id);
        await conversation.save()
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
