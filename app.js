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
import blogsRoutes from "./routes/blogsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import internetSpeedRoutes from "./routes/internetSpeedRoutes.js";
import blogCommentRoutes from "./routes/blogCommentRoute.js";
import communityRoutes from "./routes/communityRoutes.js";
import resourceRoute from "./routes/resourceRoute.js"
import errorHandler from "./middlewares/errorMiddleware.js";
import jobRoutes from "./routes/jobRoutes.js"
import favoriteRoutes from "./routes/favoritejobsRoutes.js";

import perkRoutes from "./routes/perkRoutes.js";
import successStoriesRoutes from "./routes/successStoriesRoutes.js";

import statsRoutes from "./routes/statsRoutes.js";
import newsletterRoutes from "./routes/newsletterRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
 
import applicationRoutes from "./routes/applicationRoutes.js";
connectDB();

// ✅ Initialize Express

connectDB();


const app = express();

// ✅ Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://nomad-atlast.netlify.app",
      "https://nomad-atlas-visionaire.netlify.app",
      "https://nomandatlas.web.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

app.use(express.json()); // Parse incoming JSON

// ✅ Root endpoint
app.get("/", (req, res) => {
  res.json({ status: "Server is running " });
});

app.use("/api/users", userRoutes);
app.use("/api/popular-destinations", popularDestinationRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/jobs",jobRoutes)
app.use("/api/favoritesjobs", favoriteRoutes);
app.use("/api/perks", perkRoutes);
app.use("/api/success-stories", successStoriesRoutes);
app.use("/api/stats", statsRoutes);

app.use("/api/newsletter", newsletterRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/uploads", express.static("uploads"));



// use cost-calculator
app.use("/api/cost-calculator", costCalculatorRoutes);
app.use("/api/resources", resourceRoute);
app.use("/api/blogs", blogsRoutes);
app.use("/api/comments", blogCommentRoutes);
app.use("/api/internet-speed", internetSpeedRoutes);


// Error Middleware
app.use(errorHandler);

export default app;
