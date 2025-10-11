import express from "express";
import { getUsers, registerUser } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", verifyFirebaseToken, getUsers);

export default router;
