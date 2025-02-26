import express from "express";
import {
  loginUser,
  registerUser,
  getUser,
  editUser,
} from "../controller/userController";
import verifyToken from "../middleware/auth";
const router = express.Router();

router.post("/signIn", loginUser);
router.post("/signUp", registerUser);
router.get("/", verifyToken, getUser);
router.put("/", verifyToken, editUser);

export default router;
