import { Router } from "express";
import { createCatalogRouter } from "../controllers/catalog.controller.js";
import {
  categories,
  knowledgeAreas,
  majors,
  productionTypes,
  researchLines,
  researchTypes,
  technologies,
} from "../models/index.js";

export const catalogRouter = Router();

catalogRouter.use("/production-types", createCatalogRouter(productionTypes, "Tipo de producción"));
catalogRouter.use("/categories", createCatalogRouter(categories, "Categoría"));
catalogRouter.use("/knowledge-areas", createCatalogRouter(knowledgeAreas, "Área de conocimiento"));
catalogRouter.use("/technologies", createCatalogRouter(technologies, "Tecnología"));
catalogRouter.use("/research-types", createCatalogRouter(researchTypes, "Tipo de investigación"));
catalogRouter.use("/majors", createCatalogRouter(majors, "Carrera"));
catalogRouter.use("/research-lines", createCatalogRouter(researchLines, "Línea de investigación"));
