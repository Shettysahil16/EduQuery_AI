import conversationModel from "../../models/Chat_Models/conversationModel.js";
import messageModel from "../../models/Chat_Models/messageModel.js";

const getMessageController = async (req, res) => {
  try {
    const senderId = req.userId;
    const { id: receiverId } = req.params;

    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, receiverId] },
      })

    if (!conversation) {
      return res.status(200).json({
        data: [],
        success: true,
        error: false,
      });
    }


    //const messages = conversation.messages.reverse();

    const messages = await messageModel.find({conversationId: conversation._id})

    return res.status(200).json({
      conversationId : conversation._id,
      lastMessage : conversation.lastMessage,
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


{/* 
  
import conversationModel from "../models/conversationModel.js";
import messageModel from "../models/messageModel.js";

const getMessageController = async (req, res) => {
  try {
    const senderId = req.userId;
    const { id: receiverId } = req.params;
    const { cursor, limit = 20 } = req.query;

    const conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      return res.status(200).json({
        data: [],
        success: true,
        error: false,
      });
    }

    let query = {
      conversationId: conversation._id,
    };

    if (cursor) {
      query._id = { $lt: cursor };
    }

    const messages = await messageModel
      .find(query)
      .sort({ _id : -1 })
      .limit(Number(limit));

    return res.status(200).json({
      data: messages.reverse(), // oldest → newest
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
 
*/}