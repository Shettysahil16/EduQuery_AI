import mongoose from 'mongoose';

const aiMessageSchema = mongoose.Schema({
    conversationId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'aiConversationModel',
        required : true
    },

    role: {
      type: String,
      enum: ["user", "ai"],
      required: true,
    },

    content: {
      type: String,
      required: true,
    },
},{
    timestamps: true,
})
const aiMessageModel = mongoose.model("aiMessageModel", aiMessageSchema);
export default aiMessageModel;