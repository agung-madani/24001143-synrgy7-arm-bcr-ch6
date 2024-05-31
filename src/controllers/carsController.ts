import { Request, Response } from "express";
import CarsService from "../services/carsService";

class CarsController {
  static async createCar(req: Request, res: Response) {
    try {
      let { car_name, category, price, car_image, rent_start, rent_finish } =
        req.body;
      if (!car_name || !category || !price) {
        return res.status(400).json({
          message: "The fields car's name, category, and price are required.",
        });
      }
      if (
        category !== "small" &&
        category !== "medium" &&
        category !== "large"
      ) {
        return res.status(400).json({
          message: "Category must be one of: small, medium, or large.",
        });
      }
      if (typeof price !== "number") {
        return res
          .status(400)
          .json({ message: "Price must be a valid number." });
      }
      if (rent_start && rent_finish) {
        if (new Date(rent_start) > new Date(rent_finish)) {
          return res.status(400).json({
            message: "Rent finish date must be greater than the start date.",
          });
        }
      }
      const userId = (req as any).user.id;
      const result = await CarsService.createCar(
        car_name,
        category,
        price,
        car_image,
        userId,
        rent_start,
        rent_finish
      );
      if (result.status === 201) {
        return res.status(201).json({ message: "Car added successfully." });
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

  static async getAllCars(req: Request, res: Response) {
    try {
      let cars;
      if ((req as any).user.role === "member") {
        cars = await CarsService.getAvailableCars();
        res.status(200).json({
          message: "Available cars retrieved successfully.",
          data: cars,
        });
      } else {
        cars = await CarsService.getCars();
        res
          .status(200)
          .json({ message: "All cars retrieved successfully.", data: cars });
      }
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error.",
        error: (error as Error).message,
      });
    }
  }

  static async getCarById(req: Request, res: Response) {
    try {
      const carId = req.params.id;
      const car = await CarsService.getCarById(carId);
      if (!car) {
        return res.status(404).json({ message: "Car not found." });
      }
      console.log(car.start_rent, car.finish_rent);
      res
        .status(200)
        .json({ message: "Car retrieved successfully.", data: car });
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Car not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }

  static async updateCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let { car_name, category, price, car_image, rent_start, rent_finish } =
        req.body;

      if (
        !car_name &&
        !category &&
        !price &&
        !car_image &&
        !rent_start &&
        !rent_finish
      ) {
        return res
          .status(400)
          .json({ message: "At least one field should be filled." });
      }

      const carData = await CarsService.getCarById(id);
      if (!carData) {
        return res.status(404).json({ message: "Car not found." });
      }

      car_name = car_name || carData.car_name;
      category = category || carData.category;
      price = price || carData.price;
      car_image = car_image || carData.car_image;
      rent_start = rent_start || carData.start_rent;
      rent_finish = rent_finish || carData.finish_rent;
      const created_by = carData.created_by;
      const created_at = carData.created_at;
      const deleted_status = carData.deleted_status;
      const deleted_by = carData.deleted_by;

      if (
        category !== "small" &&
        category !== "medium" &&
        category !== "large"
      ) {
        return res.status(400).json({
          message: "Category must be one of: small, medium, or large.",
        });
      }
      if (typeof price !== "number") {
        return res
          .status(400)
          .json({ message: "Price must be a valid number." });
      }
      if (rent_start && rent_finish) {
        if (new Date(rent_start) > new Date(rent_finish)) {
          return res.status(400).json({
            message: "Rent finish date must be greater than the start date.",
          });
        }
      }
      const userId = (req as any).user.id;

      const result = await CarsService.updateCarById(
        id,
        car_name,
        category,
        price,
        car_image,
        userId,
        rent_start,
        rent_finish,
        created_by,
        created_at,
        deleted_status,
        deleted_by
      );
      if (result.status === 200) {
        return res.status(200).json({ message: "Car updated successfully" });
      } else {
        return res.status(result.status).json({ message: result.data.message });
      }
    } catch (error: any) {
      if (error.message.includes("invalid input syntax for type uuid")) {
        return res.status(404).json({ message: "Car not found." });
      } else {
        res.status(500).json({
          message: "Internal Server Error.",
          error: (error as Error).message,
        });
      }
    }
  }

  static async deleteCarById(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const userId = (req as any).user.id;

      const result = await CarsService.deleteCarById(id, userId);

      if (result.status === 201) {
        return res
          .status(201)
          .json({ message: "Car soft deleted successfully." });
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
}

export default CarsController;
