import type { RequestHandler } from "express";
import path from "node:path";
import { documentService } from "../services/document.service.js";
import { BadRequestError, NotFoundError } from "../utils/httpError.js";

export const getDocument: RequestHandler = async (req, res) => {
  const document = await documentService.getByProductionId(Number(req.params.id));
  if (!document) throw new NotFoundError("Esta producción no tiene un documento asociado");
  res.json(document);
};

export const downloadDocument: RequestHandler = async (req, res) => {
  const document = await documentService.getByProductionId(Number(req.params.id));
  if (!document) throw new NotFoundError("Esta producción no tiene un documento asociado");
  res.download(documentService.resolvePath(document.storageKey), document.originalFileName);
};

export const upsertDocument: RequestHandler = async (req, res) => {
  if (!req.file) throw new BadRequestError("Debe adjuntar un archivo PDF en el campo 'file'");

  const document = await documentService.upsert(Number(req.params.id), {
    originalFileName: req.file.originalname,
    storageKey: path.join("productions", req.file.filename),
    contentType: req.file.mimetype,
    sizeBytes: req.file.size,
  });
  res.status(201).json(document);
};

export const deleteDocument: RequestHandler = async (req, res) => {
  await documentService.remove(Number(req.params.id));
  res.status(204).send();
};
