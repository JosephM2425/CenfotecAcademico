import { Router } from "express";
import { createCatalogService } from "../services/catalog.service.js";
import {
  loadCurrentUser,
  requireRole,
} from "../middlewares/auth.middleware.js";
import { Role } from "../models/enums.js";
import { BadRequestError } from "../utils/httpError.js";

export function createCatalogRouter(table: any, label: string): Router {
  const service = createCatalogService(table, label);
  const router = Router();

  router.get("/", loadCurrentUser, async (_req, res) => {
    res.json(await service.list());
  });

  router.get("/:id", loadCurrentUser, async (req, res) => {
    res.json(await service.getById(Number(req.params.id)));
  });

  router.post(
    "/",
    loadCurrentUser,
    requireRole(Role.Administrator, Role.Coordinator),
    async (req, res) => {
      const { name, description } = req.body ?? {};
      if (!name || !description)
        throw new BadRequestError("name y description son requeridos");
      res.status(201).json(await service.create({ name, description }));
    },
  );

  router.put(
    "/:id",
    loadCurrentUser,
    requireRole(Role.Administrator, Role.Coordinator),
    async (req, res) => {
      res.json(await service.update(Number(req.params.id), req.body ?? {}));
    },
  );

  router.delete(
    "/:id",
    loadCurrentUser,
    requireRole(Role.Administrator, Role.Coordinator),
    async (req, res) => {
      await service.remove(Number(req.params.id));
      res.status(204).send();
    },
  );

  return router;
}
