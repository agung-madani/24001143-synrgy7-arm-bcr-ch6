import { Request, Response } from "express";
import AdminsService from "../services/adminsService";

class AdminsController {
  static async addAdmin(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({
          message:
            "All fields are required. Please provide values for all required fields.",
        });
      }

      const result = await AdminsService.addAdmin(username, email, password);

      if (result.status === 201) {
        return res
          .status(result.status)
          .json({ message: "Admin added successfully." });
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

  static async getAllAdmins(req: Request, res: Response) {
    try {
      const admin = await AdminsService.getAdmins();

      res
        .status(200)
        .json({ message: "All admins retrieved successfully.", data: admin });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async getAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const admin = await AdminsService.getAdminById(id);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found." });
      }

      res
        .status(200)
        .json({ message: "Admin retrieved successfully.", data: admin });
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Admin not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }

  static async updateAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      const result = await AdminsService.updateAdminById(
        id,
        username,
        email,
        password
      );

      if (result.status === 200) {
        return res
          .status(result.status)
          .json({ message: "Admin updated successfully." });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Admin not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }

  static async deleteAdminById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await AdminsService.deleteAdminById(id);
      return res.status(result.status).json({ message: result.data.message });
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Admin not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }
}

export default AdminsController;
