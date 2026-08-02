import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import { BadRequestError } from "../utils/httpError.js";

export const UPLOADS_ROOT = path.resolve("uploads");
const PRODUCTIONS_DIR = path.join(UPLOADS_ROOT, "productions");

fs.mkdirSync(PRODUCTIONS_DIR, { recursive: true });

export const documentUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, PRODUCTIONS_DIR),
    filename: (req, file, cb) => {
      const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      cb(null, `${req.params.id}-${unique}${path.extname(file.originalname)}`);
    },
  }),
  limits: { fileSize: 100000000 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      cb(new BadRequestError("Solo se permiten archivos PDF"));
      return;
    }
    cb(null, true);
  },
});
