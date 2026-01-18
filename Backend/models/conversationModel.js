import mongoose from "mongoose";

const conversationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    lastMessage : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "messageModel",
    }
  },
  {
    timestamps: true,
  }
);

const conversationModel = mongoose.model(
  "conversationModel",
  conversationSchema
);
export default conversationModel;
