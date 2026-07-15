const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const messageRoutes = require("./routes/messageRoutes");
const Message = require("./models/message");

dotenv.config();

const app = express();
const server = http.createServer(app);

// ================= DATABASE =================
connectDB();

// ================= CONFIG =================
const PORT = process.env.PORT || 5000;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:3000";

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// ================= HEALTH CHECK =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Chat Backend is Running",
  });
});

// ================= ROUTES =================
app.use("/api/messages", messageRoutes);

// ================= SOCKET =================
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Store active users
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(`🟢 Socket Connected : ${socket.id}`);

  // ================= JOIN ROOM =================
  socket.on("join_room", (username) => {
    if (!username || typeof username !== "string") return;

    const cleanUsername = username.trim();

    activeUsers.set(socket.id, cleanUsername);

    const users = [...new Set(activeUsers.values())];

    io.emit("user_status", users);

    console.log(`👤 ${cleanUsername} joined`);
  });

  // ================= SEND MESSAGE =================
  socket.on("send_message", async ({ username, text }) => {
    try {
      if (!username || !text || !text.trim()) return;

      const message = await Message.create({
        username: username.trim(),
        text: text.trim(),
        timestamp: new Date(),
      });

      io.emit("receive_message", message);

      console.log(`💬 ${username}: ${text}`);
    } catch (error) {
      console.error("❌ Message Error:", error.message);
    }
  });

  // ================= TYPING =================
  socket.on("typing", ({ username, typing }) => {
    socket.broadcast.emit("display_typing", {
      username,
      typing,
    });
  });

  // ================= DISCONNECT =================
  socket.on("disconnect", () => {
    const username = activeUsers.get(socket.id);

    if (username) {
      activeUsers.delete(socket.id);

      const users = [...new Set(activeUsers.values())];

      io.emit("user_status", users);

      console.log(`🔴 ${username} disconnected`);
    }
  });
});

// ================= START SERVER =================
server.listen(PORT, () => {
  console.log("======================================");
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log(`🌍 Allowed Origin : ${FRONTEND_URL}`);
  console.log("======================================");
});