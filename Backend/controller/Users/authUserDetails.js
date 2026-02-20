import userModel from "../../models/User_Model/userModel.js";

const authUserDetailsController = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "Unauthorized: No user ID found",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    return res.status(200).json({
      data: user,
      message: "User details fetched successfully",
      success: true,
      error: false,
    });

  } catch (error) {
    console.error("Auth User Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

export default authUserDetailsController;
