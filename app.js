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
import bookingRoutes from './routes/bookingRoutes.js';
import paymentRoutes from "./routes/paymentRoutes.js";
import costCalculatorRoutes from "./routes/costCalculatorRoute.js";
import resourceRoute from "./routes/resourceRoute.js";
import blogsRoutes from "./routes/blogsRoutes.js";
import internetSpeedRoutes from "./routes/internetSpeedRoutes.js";
import commentRoutes from "./routes/blogComment.js";
import jobRoutes from "./routes/jobRoutes.js"

import favoriteRoutes from "./routes/favoritejobsRoutes.js";

import perkRoutes from "./routes/perkRoutes.js";
import successStoriesRoutes from "./routes/successStoriesRoutes.js";

import statsRoutes from "./routes/statsRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

connectDB();


const app = express();
app.use(cors());
app.use(express.json()); // Body parser
app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174/"],
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
app.use("/api/jobs",jobRoutes)
app.use("/api/favoritesjobs", favoriteRoutes);
app.use("/api/perks", perkRoutes);
app.use("/api/success-stories", successStoriesRoutes);
app.use("/api/stats", statsRoutes);

app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);




// use cost-calculator
app.use("/cost-calculator", costCalculatorRoutes);
app.use("/resources", resourceRoute);
app.use("/api/blogs", blogsRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/internet-speed", internetSpeedRoutes);

// Error Middleware
app.use(errorHandler);

export default app;
