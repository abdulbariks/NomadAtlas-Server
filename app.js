import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import popularDestinationRoutes from "./routes/popularDestinationRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

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
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
