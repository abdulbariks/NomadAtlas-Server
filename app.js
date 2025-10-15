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
import costCalculatorRoutes from "./routes/costCalculatorRoute.js";
import resourceRoute from "./routes/resourceRoute.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";

import internetSpeedRoutes from "./routes/internetSpeedRoutes.js";

connectDB();

const app = express();
app.use(cors());
app.use(express.json()); // Body parser
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
app.use('/api/bookings', bookingRoutes)
app.use("/api/payments", paymentRoutes);


// use cost-calculator
app.use("/cost-calculator", costCalculatorRoutes);
app.use("/resources", resourceRoute);
app.use("/api/blogs", blogsRoutes);
app.use("/api/internet-speed", internetSpeedRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
