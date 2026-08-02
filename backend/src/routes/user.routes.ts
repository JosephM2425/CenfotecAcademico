import { Router } from "express";
import {
  loadCurrentUser,
  requireRole,
} from "../middlewares/auth.middleware.js";
import { Role } from "../models/enums.js";
import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from "../controllers/user.controller.js";

export const userRouter = Router();

userRouter.use(loadCurrentUser, requireRole(Role.Administrator));

userRouter.get("/", listUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
