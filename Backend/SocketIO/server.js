import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

export const getReceiverSocketId = (receiverId) => {
  return users[receiverId];
};

const users = {};

io.on("connection", (socket) => {
  console.log("New user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("users", users);
  }
  io.emit("get-online", Object.keys(users));

  socket.on("disconnect", (socket) => {
    console.log("Client disconnected", socket.id);
    delete users[userId];
    io.emit("get-online", Object.keys(users));
  });
});

export { app, server, io };
