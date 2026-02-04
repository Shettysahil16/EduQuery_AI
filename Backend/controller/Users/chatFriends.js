import userModel from "../../models/User_Model/userModel.js";
import conversationModel from "../../models/Chat_Models/conversationModel.js";

const fetchChatFriendsController = async (req, res) => {
  try {
    const loggedUserId = req.userId;

    // Fetch all friends except the logged-in user
    const friends = await userModel.find({ _id: { $ne: loggedUserId } }).select("-password");

    // Fetch all conversations that include the logged-in user
    const conversations = await conversationModel.find({
      participants: loggedUserId,
    });
    
    // Map each friend to their conversation (if exists)
    const friendsWithConversation = friends.map(friend => {
      const convo = conversations.find(c =>
        c.participants.map(id => id.toString()).includes(friend._id.toString())
      );

      return {
        ...friend.toObject(),
        conversationId: convo ? convo._id : null
      };
    });

    return res.status(200).json({
      data: friendsWithConversation,
      success: true,
      error: false
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default fetchChatFriendsController;
