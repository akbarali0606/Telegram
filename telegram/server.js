require("dotenv").config(); // .env fayldan PORT olish uchun
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Barcha frontendlar ulanadigan qilib qo'yamiz
  },
});

const PORT = process.env.PORT || 3000; // Railway avtomatik port tanlaydi

// Static fayllarni `public` papkadan yuklash
app.use(express.static(path.join(__dirname, "public")));

// Asosiy sahifani yuborish
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Socket.io ishlashi
io.on("connection", (socket) => {
  console.log("Foydalanuvchi ulandi!");

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("Foydalanuvchi chiqdi");
  });
});

// Serverni ishga tushirish
server.listen(PORT, () => {
  console.log(`Server ishlayapti: http://localhost:${PORT}`);
});
