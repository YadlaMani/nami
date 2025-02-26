import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
interface DecodedToken {
  userId: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      res.status(403).json({ message: "Token not provided" });
    } else {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET!
      ) as DecodedToken;
      req.user = decoded;
      next();
    }
  } catch (err) {
    res.status(400).json({
      message: "Invalid token",
    });
  }
};
export default verifyToken;
