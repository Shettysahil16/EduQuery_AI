import aiConversationModel from "../../models/AI_Models/aiConversationModel.js";
import aiMessageModel from "../../models/AI_Models/aiMessageModel.js";


export const getAiConversationsController = async(req,res) => {
    try {
        const userId = req.userId;
        const conversation = await aiConversationModel.find({
            userId : userId,
        }).sort({ createdAt: -1 });

        if(conversation.length === 0){
            return res.status(200).json({data: [], message : 'No conversation found', success : true, error : false})
        };
        

        return res.status(200).json({
            data : conversation,
            success : true,
            error : false,
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversations", success : false, error : true });
    }
};