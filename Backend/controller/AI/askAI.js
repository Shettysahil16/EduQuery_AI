import aiConversationModel from "../../models/AI_Models/aiConversationModel.js";
import aiMessageModel from "../../models/AI_Models/aiMessageModel.js";
import { askGemini } from "../../services/gemini.service.js";
import { tutors } from "../../data/tutors.js";
import mongoose from "mongoose";

export const askAIController = async (req, res) => {
  try {
    const userId = req.userId;
    const { question, tutorId, conversationId } = req.body;

    if (!question)
      return res.status(400).json({ message: "Question required" });

    const selectedTutorId = tutorId || "general";
    const tutor = tutors[selectedTutorId];
    if (!tutor) return res.status(404).json({ message: "Tutor not found" });

    // 1. Setup Stream Headers
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    // 2. Manage Conversation & Load History
    let conversation;
    let history = [];

    const isValidObjectId =
      conversationId && mongoose.Types.ObjectId.isValid(conversationId);

    if (isValidObjectId) {
      conversation = await aiConversationModel.findOne({
        _id: conversationId,
        userId,
      });

      if (conversationId) {
        // Fetch last 6 messages for context
        const prevMessages = await aiMessageModel
          .find({ conversationId })
          .sort({ createdAt: -1 })
          .limit(6);

        history = prevMessages
          .reverse()
          .map(
            (m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`,
          );
      }
    } else {
      conversation = await aiConversationModel.create({
        userId,
        tutorId: selectedTutorId,
        subject: tutor.subject,
        historyName: tutor.historyName,
      });
    }

    res.write(
      `data: ${JSON.stringify({ conversationId: conversation._id })}\n\n`,
    );

    // 3. Save User Message
    await aiMessageModel.create({
      conversationId: conversation._id,
      role: "user",
      content: question,
    });

    // 4. Construct Multi-turn Prompt
    const systemInstruction =
      selectedTutorId === "general"
        ? "You are a helpful AI assistant."
        : `You are a ${tutor.subject} tutor. Style: ${tutor.style}. Tone: ${tutor.tone}.`;

    const finalPrompt = `
      ${systemInstruction}
      
      Conversation History:
      ${history.join("\n")}
      
      User: ${question}
      Assistant:
    `;

    let fullAnswer = "";

    // 5. Stream from Gemini
    await askGemini(finalPrompt, tutor.model, (token) => {
      fullAnswer += token;
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    });

    if (!fullAnswer.trim()) throw new Error("AI returned empty response");

    // 6. Finalize & Save
    const aiMessage = await aiMessageModel.create({
      conversationId: conversation._id,
      role: "ai",
      content: fullAnswer,
    });

    conversation.lastMessageAt = aiMessage.createdAt;
    await conversation.save();

    res.write(
      `data: ${JSON.stringify({
        done: true,
        conversationId: conversation._id,
        content: fullAnswer,
      })}\n\n`,
    );

    res.end();
  } catch (err) {
    console.error("STREAM ERROR:", err);
    res.write(`data: ${JSON.stringify({ error: err.message })}\n\n`);
    res.end();
  }
};
