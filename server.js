import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";


const PORT = process.env.PORT || 5000;

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