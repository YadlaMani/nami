import { Request, Response } from "express";
import User from "../models/User";
import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { unescapeLeadingUnderscores } from "typescript";
const signupSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  firstname: z.string().max(30, "Firstname must be at most 30 characters long"),
  lastname: z.string().max(30, "Lastname must be at most 30 characters long"),
});
export const registerUser = async (req: Request, res: Response) => {
  const { username, password, firstname, lastname } = signupSchema.parse(
    req.body
  );
  try {
    const user = await User.find({ username: username });
    if (user.length > 0) {
      res.status(411).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        username,
        password: hashedPassword,
        firstname,
        lastname,
      });
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET!);
      res.status(200).json({
        message: "User created successfully",
        token,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      res.status(411).json({ message: "User not found" });
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(411).json({ message: "Invalid password" });
      } else {
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!);
        res.status(200).json({
          message: "User login sucessfull",
          token: token,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({
        message: "Unauthorized access",
      });
      return;
    }
    const userId = req.user.userId;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(411).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      message: "User found",
      user,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
const updateBody = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .optional(),
  firstname: z
    .string()
    .max(30, "Firstname must be at most 30 characters long")
    .optional(),
  lastname: z
    .string()
    .max(30, "Lastname must be at most 30 characters long")
    .optional(),
});
export const editUser = async (req: Request, res: Response) => {
  try {
    if (!req.user || !req.user.userId) {
      res.status(401).json({
        message: "Unauthorized access",
      });
      return;
    }
    const sucessfull = updateBody.parse(req.body);
    if (!sucessfull) {
      res.status(411).json({
        message: "Error while update information",
      });
      return;
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId },
      req.body
    );
    await user?.save();
    res.status(200).json({
      message: "User updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
export const getUsers = async (req: Request, res: Response) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastname: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });
  res.json({
    users: users,
  });
};
