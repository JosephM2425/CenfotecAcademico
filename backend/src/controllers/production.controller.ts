import type { RequestHandler } from "express";
import { productionService } from "../services/production.service.js";
import { BadRequestError, ForbiddenError } from "../utils/httpError.js";

const REQUIRED_FIELDS = [
  "title",
  "author",
  "productionTypeId",
  "categoryId",
  "knowledgeAreaId",
  "researchTypeId",
  "majorId",
  "researchLineId",
  "year",
  "status",
  "summary",
] as const;

function parseIntParam(value: unknown): number | undefined {
  if (typeof value !== "string" || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export const listProductions: RequestHandler = async (req, res) => {
  const q = req.query;
  const sortBy = q.sortBy === "title" || q.sortBy === "year" || q.sortBy === "createdAt" ? q.sortBy : undefined;

  const result = await productionService.list({
    q: typeof q.q === "string" ? q.q : undefined,
    productionTypeId: parseIntParam(q.productionTypeId),
    categoryId: parseIntParam(q.categoryId),
    knowledgeAreaId: parseIntParam(q.knowledgeAreaId),
    majorId: parseIntParam(q.majorId),
    researchTypeId: parseIntParam(q.researchTypeId),
    researchLineId: parseIntParam(q.researchLineId),
    technologyId: parseIntParam(q.technologyId),
    year: parseIntParam(q.year),
    status: parseIntParam(q.status),
    page: parseIntParam(q.page),
    pageSize: parseIntParam(q.pageSize),
    sortBy,
    sortDir: q.sortDir === "asc" ? "asc" : "desc",
  });
  res.json(result);
};

export const getProduction: RequestHandler = async (req, res) => {
  res.json(await productionService.getById(Number(req.params.id)));
};

export const createProduction: RequestHandler = async (req, res) => {
  const body = req.body ?? {};
  for (const field of REQUIRED_FIELDS) {
    if (body[field] === undefined || body[field] === null || body[field] === "") {
      throw new BadRequestError(`El campo ${field} es requerido`);
    }
  }
  if (!req.currentUser) throw new ForbiddenError();

  const created = await productionService.create(
    {
      title: body.title,
      author: body.author,
      productionTypeId: Number(body.productionTypeId),
      categoryId: Number(body.categoryId),
      knowledgeAreaId: Number(body.knowledgeAreaId),
      researchTypeId: Number(body.researchTypeId),
      majorId: Number(body.majorId),
      researchLineId: Number(body.researchLineId),
      year: Number(body.year),
      status: Number(body.status),
      summary: body.summary,
      technologyIds: Array.isArray(body.technologyIds) ? body.technologyIds.map(Number) : [],
      coauthorNames: Array.isArray(body.coauthorNames) ? body.coauthorNames : [],
    },
    req.currentUser.id,
  );
  res.status(201).json(created);
};

export const updateProduction: RequestHandler = async (req, res) => {
  if (!req.currentUser) throw new ForbiddenError();
  const updated = await productionService.update(Number(req.params.id), req.body ?? {}, req.currentUser);
  res.json(updated);
};

export const deleteProduction: RequestHandler = async (req, res) => {
  if (!req.currentUser) throw new ForbiddenError();
  await productionService.remove(Number(req.params.id), req.currentUser);
  res.status(204).send();
};
