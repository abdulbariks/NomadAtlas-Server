import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import popularDestinationRoutes from "./routes/popularDestinationRoutes.js";

dotenv.config();

const app = express();
app.use(express.json()); // Body parser
app.use(
  cors({
    origin: ["http://localhost:5173", ""], // your frontend URLs
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
