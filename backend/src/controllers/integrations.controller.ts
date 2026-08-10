import type { RequestHandler } from "express";
import { openAlexService } from "../services/openalex.service.js";

export const syncOpenAlexCatalogs: RequestHandler = async (_req, res) => {
  res.json(await openAlexService.syncCatalogs());
};
