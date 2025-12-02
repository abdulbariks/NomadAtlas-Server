import express from "express";
import {
    checkUserRole,
    getUsers,
    registerUser,
    getUserByEmail,
    updateUserProfile,
    updateUserRole // You might need to create this
} from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

// Public route
router.post("/", registerUser);

// Admin only routes
router.get("/", verifyFirebaseToken, verifyAdmin, getUsers);
router.patch('/email/:email/role', verifyFirebaseToken, verifyAdmin, updateUserRole); // Separate role update

// Protected routes - any authenticated user
router.get("/role/:email", verifyFirebaseToken, checkUserRole);
router.get('/email/:email', getUserByEmail);
router.patch('/email/:email', verifyFirebaseToken, updateUserProfile); // Users can update own profile

export default router;