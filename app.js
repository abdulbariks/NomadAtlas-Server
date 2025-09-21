import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Body parser

// Routes
app.use("/api/users", userRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
