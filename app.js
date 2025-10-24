import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

// Import Routes
import userRoutes from "./routes/userRoutes.js";
import popularDestinationRoutes from "./routes/popularDestinationRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import costCalculatorRoutes from "./routes/costCalculatorRoute.js";
import blogRoutes from "./routes/blogsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import internetSpeedRoutes from "./routes/internetSpeedRoutes.js";
import commentRoutes from "./routes/blogCommentRoute.js";
import resourceRoute from "./routes/resourceRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";

// ✅ Connect to MongoDB
import communityRoutes from "./routes/communityRoutes.js";
connectDB();

// ✅ Initialize Express
const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"], // your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json()); // Parse incoming JSON

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running " });
});

// ✅ Register all routes
app.use("/api/users", userRoutes);
app.use("/api/popular-destinations", popularDestinationRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/internet-speed", internetSpeedRoutes);



// ✅ Global error handler
app.use("/api/community", communityRoutes);


// use cost-calculator
app.use("/api/cost-calculator", costCalculatorRoutes);
app.use("/api/resources", resourceRoute);


// Error Middleware
app.use(errorHandler);

export default app;
