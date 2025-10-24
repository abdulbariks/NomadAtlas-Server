import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import http from "http"
import connectDB from "./config/db.js";
import { Server } from "socket.io";
import CommunityMessage from "./models/communityModal.js"

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
//setup socket io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
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


// Connect DB first, then start server
// Connect to MongoDB and start server (only if not running in Vercel serverless mode)
const startServer = async () => {
  try {
    await connectDB();

    // Only listen if not running in a Vercel serverless environment
    if (process.env.VERCEL !== "1") {
      app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
      });
    } else {
      console.log("Running in Vercel serverless mode (no manual listen)");
    }
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    // process.exit(1);
  }
};

startServer();

export default app;
