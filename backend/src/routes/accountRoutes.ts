import express from "express";
const router = express.Router();
import { getBalance, transferMoney } from "../controller/accountController";

router.get("/balance", getBalance);
router.post("/transfer", transferMoney);
export default router;
