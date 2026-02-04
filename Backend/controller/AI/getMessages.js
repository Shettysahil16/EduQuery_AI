//import aiConversationModel from "../../models/AI_Models/aiConversationModel";
import aiMessageModel from "../../models/AI_Models/aiMessageModel.js";

export const getAiMessagesController = async(req,res) => {
    try {
        //const userId = req.userId;
        const { id: conversationId} = req.params;

        const messages = await aiMessageModel.find({
            conversationId : conversationId,
        });

        if(!messages){
            return res.status(200).json({
                data : [],
                success : true,
                error : false,
            });

        }
        return res.status(200).json({
            data : messages,
            success : true,
            error : false,
        });
        
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversations", success : false, error : true });
    }
}