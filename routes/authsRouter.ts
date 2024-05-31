import express from "express";
import AuthsController from "../controllers/authsController";
import { authsMiddleware } from "../middlewares/authsMiddleware";
import { rolesMiddleware } from "../middlewares/rolesMiddleware";

const router = express.Router();

router.post(
  "/login/superadmin",
  rolesMiddleware([]),
  AuthsController.loginSuperadmin
);
router.post("/login", rolesMiddleware([]), AuthsController.login);
router.post("/register", AuthsController.register);
router.get("/me", authsMiddleware, AuthsController.getCurrentUser);

export default router;
