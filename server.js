import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import http from "http"
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import CommunityMessage from "./models/communityModal.js"

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
//setup socket io
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://nomandatlas.web.app", "https://nomad-atlast.netlify.app"],
    methods: ["GET", "POST"]
  }
});


io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("send_message", async (data) => {
    try {
      const savedMsg = await CommunityMessage.create({
        senderId: data.senderId,
        senderName: data.senderName,
        text: data.text,
      });

      io.emit("receive_message", savedMsg);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});


connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });

export default app;
 