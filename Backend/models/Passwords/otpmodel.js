import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    require: true,
  },
});

export default mongoose.model("OTP", otpSchema);
