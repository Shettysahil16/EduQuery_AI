import aiConversationModel from "../../models/AI_Models/aiConversationModel.js";

export const deleteConversationController = async(req, res) => {
    try {
        const { conversationId } = req.body;

        if(!conversationId){
            return res.status(404).json({
                messsage : 'please select a valid conversation',
                success : false,
                error : true
            });
        }

        const conversation = await aiConversationModel.findByIdAndDelete(conversationId);

        return res.status(200).json({
            data : conversation,
            message : 'Deleted successfully',
            success : true,
            error : false,
        });

    } catch (error) {
        res.status(500).json({ message: "Failed to fetch conversations", success : false, error : true });
    }
}