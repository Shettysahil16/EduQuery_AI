import userModel from "../../models/User_Model/userModel.js";
import bcrypt from 'bcrypt';

export const setNewPasswordController = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(newPassword, salt);
    const userNewPassword = await userModel.findOneAndUpdate(
      { email },
      { password: hashPassword },
      { new: true },
    );
    return res.status(200).json({
      data: userNewPassword,
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error in sending message" + error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
