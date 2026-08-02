import { Router } from "express";
import { loadCurrentUser, requireRole } from "../middlewares/auth.middleware.js";
import { Role } from "../models/enums.js";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

export const dashboardRouter = Router();

dashboardRouter.get(
  "/stats",
  loadCurrentUser,
  requireRole(Role.Administrator, Role.Coordinator, Role.Teacher, Role.Researcher),
  getDashboardStats,
);
