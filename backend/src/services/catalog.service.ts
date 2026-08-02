import { eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { NotFoundError } from "../utils/httpError.js";

export interface CatalogRecord {
  id: number;
  name: string;
  description: string;
}

export interface CatalogInput {
  name: string;
  description: string;
}

export function createCatalogService(table: any, label: string) {
  return {
    async list(): Promise<CatalogRecord[]> {
      return (await db.select().from(table)) as CatalogRecord[];
    },

    async getById(id: number): Promise<CatalogRecord> {
      const rows = (await db
        .select()
        .from(table)
        .where(eq(table.id, id))) as CatalogRecord[];
      const row = rows[0];
      if (!row) throw new NotFoundError(`${label} con id ${id} no encontrado`);
      return row;
    },

    async create(input: CatalogInput): Promise<CatalogRecord> {
      const rows = (await db
        .insert(table)
        .output()
        .values(input)) as CatalogRecord[];
      return rows[0];
    },

    async update(
      id: number,
      input: Partial<CatalogInput>,
    ): Promise<CatalogRecord> {
      const rows = (await db
        .update(table)
        .set(input)
        .output()
        .where(eq(table.id, id))) as CatalogRecord[];
      const row = rows[0];
      if (!row) throw new NotFoundError(`${label} con id ${id} no encontrado`);
      return row;
    },

    async remove(id: number): Promise<void> {
      const rows = (await db
        .delete(table)
        .output()
        .where(eq(table.id, id))) as CatalogRecord[];
      if (!rows[0])
        throw new NotFoundError(`${label} con id ${id} no encontrado`);
    },
  };
}
