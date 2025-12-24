import userModel from "../models/userModel.js";

const fetchChatFriendsController = async (req, res) => {
  try {
    const friends = await userModel.find().select("-password");

    return res.status(200).json({
        data : friends,
        success : true,
        error : false
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default fetchChatFriendsController;
