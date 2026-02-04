import mongoose from "mongoose";

const aiConversationSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "userModel",
      required: true,
    },

    tutorId: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },
    
    historyName : {
      type : String,
      required : true,
    },

    lastMessageAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

const aiConversationModel = mongoose.model("aiConversationModel", aiConversationSchema);
export default aiConversationModel;