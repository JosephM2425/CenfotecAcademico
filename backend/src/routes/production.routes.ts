import { Router } from "express";
import { loadCurrentUser } from "../middlewares/auth.middleware.js";
import { documentUpload } from "../config/upload.js";
import {
  createProduction,
  deleteProduction,
  getProduction,
  listProductions,
  updateProduction,
} from "../controllers/production.controller.js";
import {
  deleteDocument,
  downloadDocument,
  getDocument,
  upsertDocument,
} from "../controllers/document.controller.js";

export const productionRouter = Router();

productionRouter.use(loadCurrentUser);

productionRouter.get("/", listProductions);
productionRouter.post("/", createProduction);
productionRouter.get("/:id", getProduction);
productionRouter.put("/:id", updateProduction);
productionRouter.delete("/:id", deleteProduction);

productionRouter.get("/:id/document", getDocument);
productionRouter.get("/:id/document/file", downloadDocument);
productionRouter.put("/:id/document", documentUpload.single("file"), upsertDocument);
productionRouter.delete("/:id/document", deleteDocument);
