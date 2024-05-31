import { Request, Response, NextFunction } from "express";
import UsersRepository from "../repositories/usersRepository";
import bcrypt from "bcrypt";

export const rolesMiddleware = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.path === "/login/superadmin") {
      async function determineIfUserIsSuperadmin(
        email: string,
        password: string
      ): Promise<string> {
        if (!email || !password) {
          return "invalid";
        }

        async function checkPassword(
          password: string,
          hashedPassword: string
        ): Promise<boolean> {
          return await bcrypt.compare(password, hashedPassword);
        }

        const user = await UsersRepository.findByEmail(email);
        if (!user) {
          return "incorrect";
        } else {
          const compared = await checkPassword(password, user.password);
          if (!compared) {
            return "incorrect";
          }
          if (user?.role !== "superadmin") {
            return "forbidden";
          }
        }
        return "correct";
      }

      const userIsSuperadmin = await determineIfUserIsSuperadmin(
        req.body.email as string,
        req.body.password as string
      );
      if (userIsSuperadmin === "invalid") {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      } else if (userIsSuperadmin === "incorrect") {
        return res.status(400).json({
          message:
            "The email or password provided is incorrect. Please check your credentials and try again.",
        });
      } else if (userIsSuperadmin === "forbidden") {
        return res.status(403).json({
          message: "You do not have permission to access this resource.",
        });
      }
    } else if (req.path === "/login") {
      async function determineIfUserIsAdminOrMember(
        email: string,
        password: string
      ): Promise<string> {
        if (!email || !password) {
          return "invalid";
        }

        async function checkPassword(
          password: string,
          hashedPassword: string
        ): Promise<boolean> {
          return await bcrypt.compare(password, hashedPassword);
        }

        const user = await UsersRepository.findByEmail(email);
        if (!user) {
          return "incorrect";
        } else {
          const compared = await checkPassword(password, user.password);
          if (!compared) {
            return "incorrect";
          }
          if (user?.role !== "admin" && user?.role !== "member") {
            return "forbidden";
          }
        }
        return "correct";
      }
      const userIsAdminOrMember = await determineIfUserIsAdminOrMember(
        req.body.email as string,
        req.body.password as string
      );
      if (userIsAdminOrMember === "invalid") {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      } else if (userIsAdminOrMember === "incorrect") {
        return res.status(400).json({
          message:
            "The email or password provided is incorrect. Please check your credentials and try again.",
        });
      } else if (userIsAdminOrMember === "forbidden") {
        return res.status(403).json({
          message: "You do not have permission to access this resource.",
        });
      }
    } else {
      if (!roles.includes((req as any).user.role)) {
        return res.status(403).json({
          message: "You do not have permission to access this resource.",
        });
      }
    }
    next();
  };
};
