import { eq } from "drizzle-orm";
import fs from "node:fs/promises";
import path from "node:path";
import { db } from "../config/db.js";
import { documents } from "../models/index.js";
import { NotFoundError } from "../utils/httpError.js";
import { UPLOADS_ROOT } from "../config/upload.js";

export interface DocumentInput {
  originalFileName: string;
  storageKey: string;
  contentType: string;
  sizeBytes?: number;
}

async function deleteFile(storageKey: string) {
  await fs.unlink(path.join(UPLOADS_ROOT, storageKey)).catch(() => {});
}

export const documentService = {
  async getByProductionId(productionId: number) {
    const [row] = await db
      .select()
      .from(documents)
      .where(eq(documents.productionId, productionId));
    return row ?? null;
  },

  resolvePath(storageKey: string) {
    return path.join(UPLOADS_ROOT, storageKey);
  },

  async upsert(productionId: number, input: DocumentInput) {
    const existing = await this.getByProductionId(productionId);
    if (existing) {
      const [row] = await db
        .update(documents)
        .set(input)
        .output()
        .where(eq(documents.productionId, productionId));
      await deleteFile(existing.storageKey);
      return row;
    }
    const [row] = await db
      .insert(documents)
      .output()
      .values({ productionId, ...input });
    return row;
  },

  async remove(productionId: number) {
    const [row] = await db
      .delete(documents)
      .output()
      .where(eq(documents.productionId, productionId));
    if (!row)
      throw new NotFoundError("Esta producción no tiene un documento asociado");
    await deleteFile(row.storageKey);
  },
};
