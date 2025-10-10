import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import popularDestinationRoutes from "./routes/popularDestinationRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json()); // Body parser
app.use(
    cors({
        origin: ["http://localhost:5173"], // your frontend URLs
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);

app.get("/", (req, res) => {
    res.json({ status: "Server is running 🚀" });
});
app.use("/api/users", userRoutes);
app.use("/api/popular-destinations", popularDestinationRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
