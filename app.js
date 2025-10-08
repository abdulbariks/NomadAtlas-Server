import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Body parser

// Routes
// app.use("/api/users", userRoutes);
app.use("/api/blogs", userRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
