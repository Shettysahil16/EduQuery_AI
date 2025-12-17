import express from "express";
import connectDB from "./config/db.js";
import { configDotenv } from "dotenv";
import router from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";



configDotenv();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
)
app.use(express.json());
app.use(cookieParser());

app.use("/api", router);

const PORT = process.env.PORT || 5050;


connectDB().then(() => {
    app.listen(PORT, () => {
      console.log("✅ MongoDB connected");
      console.log(`🚀 Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("❌ MongoDB connection failed:", error.message);
})
 