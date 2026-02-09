import PDFDocument from "pdfkit";
import aiMessageModel from "../models/AI_Models/aiMessageModel.js";
import removeMd from "remove-markdown";

export const chatPdfController = async (req, res) => {
  try {
    const { conversationId } = req.params;

    // Fetch messages sorted by time
    const messages = await aiMessageModel.find({ conversationId }).sort({ createdAt: 1 });

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=conversation-${conversationId}.pdf`);

    doc.pipe(res);

    // Title
    doc.fontSize(18).text("EduQuery AI Conversation", { align: "center" });
    doc.moveDown(2);

    let questionNumber = 1;

    for (let msg of messages) {
        let cleanText = removeMd(msg.content);

      if (msg.role === "user") {
        // Bold Question
        doc.font("Helvetica-Bold").fontSize(14).text(
          `Q${questionNumber}. ${cleanText}`
        );
        doc.moveDown(0.5);
        questionNumber++;
      } 
      else if (msg.role === "ai") {
        // Normal Answer
        doc.font("Helvetica").fontSize(12).text(cleanText);
        doc.moveDown(1);
      }
    }

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "PDF generation failed" });
  }
};
