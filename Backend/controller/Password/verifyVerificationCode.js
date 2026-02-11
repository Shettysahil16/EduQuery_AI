import otpmodel from "../../models/Passwords/otpmodel.js";

export const verifyVerificationCodeController = async (req, res) => {
  const { otp } = req.body;
  try {
    const otpData = await otpmodel.findOne({ otp });
    //console.log("otpData", otpData);

    if (!otpData)
      return res.status(400).json({ success: false, message: "No OTP found" });

    if (otpData.expiresAt < Date.now())
      return res.status(400).json({ success: false, message: "OTP expired" });

    if (otpData.otp !== otp)
      return res.status(400).json({ success: false, message: "Invalid OTP" });

    res
      .status(200)
      .json({ data: otpData, success: true, message: "otp is valid" });
  } catch (error) {
    console.log("Error in sending message" + error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: true,
    });
  }
};
