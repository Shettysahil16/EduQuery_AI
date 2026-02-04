import aiConversationModel from "../../models/AI_Models/aiConversationModel.js";
import aiMessageModel from "../../models/AI_Models/aiMessageModel.js";
import { askGemini } from "../../services/gemini.service.js";
import { tutors } from "../../data/tutors.js";


export const askAIController = async (req, res) => {
  try {
    const userId = req.userId;
    const { question, tutorId, conversationId } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question required" });
    }

    const selectedTutorId = tutorId || "general";
    const tutor = tutors[selectedTutorId];

    if (!tutor) {
      return res.status(404).json({ message: "Tutor not found" });
    }

    let conversation;

    if (conversationId) {
      conversation = await aiConversationModel.findOne({
        _id: conversationId,
        userId,
      });
    } else {
      conversation = await aiConversationModel.create({
        userId,
        tutorId: selectedTutorId,
        subject: tutor.subject,
        historyName: tutor.historyName,
      });
    }

    const userMessage = await aiMessageModel.create({
      conversationId: conversation._id,
      role: "user",
      content: question,
    });

    const prompt =
      selectedTutorId === "general"
        ? `
You are a helpful AI assistant.
Answer clearly and accurately.

Question:
${question}
`
        : `
You are a ${tutor.subject} tutor.
Teaching style: ${tutor.style || "clear explanations with examples"}.
Tone: ${tutor.tone || "friendly"}.


Question:
${question}
`;

    const answer = await askGemini(prompt, tutor.model);

    const aiMessage = await aiMessageModel.create({
      conversationId: conversation._id,
      role: "ai",
      content: answer,
    });

    conversation.lastMessageAt = aiMessage.createdAt;
    await conversation.save();

    //const answer = await askGemini(prompt);
    return res.status(200).json({
      conversationId: conversation._id,
      tutorId: selectedTutorId,
      subject: tutor.subject,
      content : answer,
      role : aiMessage.role,
    });
  } catch (err) {
    console.error("AI ERROR FULL:", err);
    res.status(500).json({
      message: err.message || "AI service failed",
    });
  }
};
