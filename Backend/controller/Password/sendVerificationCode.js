import nodemailer from "nodemailer";
import userModel from "../../models/User_Model/userModel.js";
import otpmodel from "../../models/Passwords/otpmodel.js";

export const sendVerificationCodeController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({
        message: "email field cannot be empty",
        success: false,
      });
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    await otpmodel.findOneAndUpdate(
      { email },
      { otp: verificationCode, expiresAt },
      { upsert: true, new: true },
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "EduQuery AI - Password Reset Verification Code",
      html: `<h3>Your OTP is <b>${verificationCode}</b> <br>Please don't share this code with anyone.</h3><p>It will expire in 2 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);
    res
      .status(200)
      .json({ data: user, success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.log("Error in sending message" + error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
