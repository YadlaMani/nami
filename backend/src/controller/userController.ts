import { Request, Response } from "express";
import User from "../models/User";
export const registerUser = async (req: Request, res: Response) => {
  res.send("Registered User");
};
export const loginUser = async (req: Request, res: Response) => {
  res.send("Logged in User");
};
