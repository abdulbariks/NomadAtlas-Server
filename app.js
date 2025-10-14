import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import popularDestinationRoutes from "./routes/popularDestinationRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import internetSpeedRoutes from "./routes/internetSpeedRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.get("/", (req, res) => {
  res.json({ status: "Server is running 🚀" });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/popular-destinations", popularDestinationRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/internet-speed", internetSpeedRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
