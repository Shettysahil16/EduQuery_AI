import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "conversationModel",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status : {
      type : String,
      enum : ['sending', 'sent', 'delivered', 'read'],
      default : 'sent'
    }
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("messageModel", messageSchema);
export default messageModel;
