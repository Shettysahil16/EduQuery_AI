import conversationModel from "../models/conversationModel.js";

const getMessageController = async (req, res) => {
  try {
    const senderId = req.userId;
    const { id: receiverId } = req.params

    const conversation = await conversationModel.findOne({
        participants : { $all : [senderId, receiverId]},
    }).populate("messages")

    if(!conversation){
        return res.status(200).json({
        message: "No conversation found",
        success: true,
        error: false,
      });
    }

    const messages = conversation.messages;

    return res.status(200).json({
      data: messages,
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

export default getMessageController;
