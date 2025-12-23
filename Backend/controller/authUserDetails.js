import userModel from "../models/userModel.js";

const authUserDetailsController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("-password");
    return res.status(200).json({
      data: user,
      message: "user details",
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

export default authUserDetailsController;
