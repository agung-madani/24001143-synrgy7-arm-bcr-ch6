import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication required. Please provide valid token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: "Authentication failed. Please provide valid token." });
  }
};
