import { Router } from "express";
import { syncOpenAlexCatalogs } from "../controllers/integrations.controller.js";
import { loadCurrentUser, requireRole } from "../middlewares/auth.middleware.js";
import { Role } from "../models/enums.js";

export const integrationsRouter = Router();

integrationsRouter.post(
  "/openalex/sync-catalogs",
  loadCurrentUser,
  requireRole(Role.Administrator, Role.Coordinator),
  syncOpenAlexCatalogs,
);
