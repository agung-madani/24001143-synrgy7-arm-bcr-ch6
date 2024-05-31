import express from "express";
import CarsController from "../controllers/carsController";
import { authsMiddleware } from "../middlewares/authsMiddleware";
import { rolesMiddleware } from "../middlewares/rolesMiddleware";

const router = express.Router();

router.post(
  "/",
  authsMiddleware,
  rolesMiddleware(["admin", "superadmin"]),
  CarsController.createCar
);
router.get("/", authsMiddleware, CarsController.getAllCars);
router.get(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["admin", "superadmin"]),
  CarsController.getCarById
);
router.put(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["admin", "superadmin"]),
  CarsController.updateCarById
);
router.delete(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["admin", "superadmin"]),
  CarsController.deleteCarById
);

export default router;
