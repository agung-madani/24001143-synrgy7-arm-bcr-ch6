import { Request, Response } from "express";
import AuthsService from "../services/authsService";

class AuthsController {
  static async loginSuperadmin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await AuthsService.login(email);
      if (result.status === 201) {
        return res.status(result.status).json({
          message: "Login successful for Superadmin.",
          token: result.data.token,
          role: result.data.role,
        });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      }

      const result = await AuthsService.login(email);
      if (result.status === 201) {
        return res.status(result.status).json({
          message: `Login successful for ${result.data.role}.`,
          token: result.data.token,
          role: result.data.role,
        });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      }
      const result = await AuthsService.register(username, email, password);
      if (result.status === 201) {
        return res.status(result.status).json({
          message: "Member successfully registered.",
        });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async getCurrentUser(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      res.status(200).json({ message: "Success", data: user });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }
}

export default AuthsController;
