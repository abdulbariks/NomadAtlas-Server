import express from "express";
import { checkUserRole, getUsers, registerUser, getUserByEmail, updateUserProfile } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", verifyFirebaseToken, verifyAdmin, getUsers);
router.get("/role/:email",verifyFirebaseToken, checkUserRole);
router.get('/email/:email', getUserByEmail);
router.patch('/email/:email', updateUserProfile);

export default router;
