import express from "express";
import { loginUser, registerUser } from "../controller/userController";
const router = express.Router();

router.post("/signIn", loginUser);
router.post("/signUp", registerUser);

export default router;
