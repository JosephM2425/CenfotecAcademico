import type { RequestHandler } from "express";
import { dashboardService } from "../services/dashboard.service.js";

export const getDashboardStats: RequestHandler = async (_req, res) => {
  res.json(await dashboardService.getStats());
};
