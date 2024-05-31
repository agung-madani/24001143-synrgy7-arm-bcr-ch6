import express from "express";
import authsRouter from "./authsRouter";
import adminsRouter from "./adminsRouter";
import carsRouter from "./carsRouter";

const router = express.Router();

router.use("/api/auth", authsRouter);
router.use("/api/admin", adminsRouter);
router.use("/api/cars", carsRouter);

export default router;
