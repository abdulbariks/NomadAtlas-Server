import express from "express";
import { checkUserRole, getUsers, registerUser } from "../controllers/userController.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", verifyFirebaseToken, verifyAdmin, getUsers);
router.get("/role/:email", checkUserRole)

export default router;
