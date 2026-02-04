import conversationModel from '../../models/Chat_Models/conversationModel.js'

const getConversationsController = async (req, res) => {
  try {
    const userId = req.userId;

    const conversations = await conversationModel
      .find({ participants: userId })
      .populate("participants", "fullName email") // fetch user info
      .populate({
        path: "lastMessage",
        select: "message createdAt senderId", // fetch last msg
      })
      .sort({ updatedAt: -1 }); // sort by last updated

    return res.status(200).json({
      data: conversations,
      success: true,
      error: false,
    });
  } catch (error) {
    console.log("Error in getting conversations", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default getConversationsController;