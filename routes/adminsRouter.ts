import express from "express";
import AdminsController from "../controllers/adminsController";
import { authsMiddleware } from "../middlewares/authsMiddleware";
import { rolesMiddleware } from "../middlewares/rolesMiddleware";

const router = express.Router();

router.post(
  "/",
  authsMiddleware,
  rolesMiddleware(["superadmin"]),
  AdminsController.addAdmin
);
router.get(
  "/",
  authsMiddleware,
  rolesMiddleware(["superadmin"]),
  AdminsController.getAllAdmins
);
router.get(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["superadmin"]),
  AdminsController.getAdminById
);
router.put(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["superadmin"]),
  AdminsController.updateAdminById
);
router.delete(
  "/:id",
  authsMiddleware,
  rolesMiddleware(["superadmin"]),
  AdminsController.deleteAdminById
);

export default router;
