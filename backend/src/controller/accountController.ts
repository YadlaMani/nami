import { Request, Response } from "express";
import Account from "../models/Account";
import mongoose from "mongoose";
export const getBalance = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({
        message: "Unauthorized access",
      });
      return;
    }
    const account = await Account.findOne({ holder: req.user.userId });
    console.log(account);
    res.status(200).json({
      message: "Balanced fetched succesfully",
      balance: account?.balance,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
export const transferMoney = async (req: Request, res: Response) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!req.user || !req.user.userId) {
      await session.abortTransaction();
      res.status(401).json({ message: "Unauthorized access" });
      return;
    }

    const { to, amount } = req.body;

    // const roundedAmount = Number(amount.toFixed(2));
    // console.log(roundedAmount);

    const account = await Account.findOne({ holder: req.user.userId }).session(
      session
    );
    const toAccount = await Account.findOne({ holder: to }).session(session);
    console.log(account, toAccount);

    if (!account || !toAccount) {
      await session.abortTransaction();
      res.status(411).json({ message: "Account not found" });
      return;
    }

    if (account.balance < amount) {
      await session.abortTransaction();
      res.status(400).json({ message: "Insufficient balance" });
      return;
    }

    await Account.updateOne(
      { holder: req.user.userId },
      { $inc: { balance: -amount } },
      { session }
    );

    await Account.updateOne(
      { holder: to },
      { $inc: { balance: amount } },
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Money transferred successfully" });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ message: "Something went wrong", error: err });
  } finally {
    session.endSession();
  }
};
