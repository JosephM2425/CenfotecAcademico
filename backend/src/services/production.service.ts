import { and, asc, count, desc, eq, inArray, like, or, type SQL } from "drizzle-orm";
import { db } from "../config/db.js";
import {
  productionCoauthors,
  productions,
  productionTechnologies,
  technologies,
  documents,
} from "../models/index.js";
import { NotFoundError, ForbiddenError } from "../utils/httpError.js";
import { Role } from "../models/enums.js";
import type { CurrentUser } from "../middlewares/auth.middleware.js";

export interface ProductionFilters {
  q?: string;
  productionTypeId?: number;
  categoryId?: number;
  knowledgeAreaId?: number;
  majorId?: number;
  researchTypeId?: number;
  researchLineId?: number;
  technologyId?: number;
  year?: number;
  status?: number;
  page?: number;
  pageSize?: number;
  sortBy?: "title" | "year" | "createdAt";
  sortDir?: "asc" | "desc";
}

export interface ProductionInput {
  title: string;
  author: string;
  productionTypeId: number;
  categoryId: number;
  knowledgeAreaId: number;
  researchTypeId: number;
  majorId: number;
  researchLineId: number;
  year: number;
  status: number;
  summary: string;
  technologyIds: number[];
  coauthorNames: string[];
}

const sortColumns = {
  title: productions.title,
  year: productions.year,
  createdAt: productions.createdAt,
};

export const productionService = {
  async list(filters: ProductionFilters) {
    const page = filters.page && filters.page > 0 ? filters.page : 1;
    const pageSize = filters.pageSize && filters.pageSize > 0 ? Math.min(filters.pageSize, 100) : 20;

    const conditions: SQL[] = [];
    if (filters.q) {
      const pattern = `%${filters.q}%`;
      const searchCondition = or(
        like(productions.title, pattern),
        like(productions.author, pattern),
        like(productions.summary, pattern),
      );
      if (searchCondition) conditions.push(searchCondition);
    }
    if (filters.productionTypeId) conditions.push(eq(productions.productionTypeId, filters.productionTypeId));
    if (filters.categoryId) conditions.push(eq(productions.categoryId, filters.categoryId));
    if (filters.knowledgeAreaId) conditions.push(eq(productions.knowledgeAreaId, filters.knowledgeAreaId));
    if (filters.majorId) conditions.push(eq(productions.majorId, filters.majorId));
    if (filters.researchTypeId) conditions.push(eq(productions.researchTypeId, filters.researchTypeId));
    if (filters.researchLineId) conditions.push(eq(productions.researchLineId, filters.researchLineId));
    if (filters.year) conditions.push(eq(productions.year, filters.year));
    if (filters.status) conditions.push(eq(productions.status, filters.status));

    if (filters.technologyId) {
      const rows = await db
        .select({ productionId: productionTechnologies.productionId })
        .from(productionTechnologies)
        .where(eq(productionTechnologies.technologyId, filters.technologyId));
      const ids = rows.map((r) => r.productionId);
      if (ids.length === 0) {
        return { items: [], total: 0, page, pageSize };
      }
      conditions.push(inArray(productions.id, ids));
    }

    const where = conditions.length ? and(...conditions) : undefined;
    const sortColumn = sortColumns[filters.sortBy ?? "createdAt"];
    const orderBy = filters.sortDir === "asc" ? asc(sortColumn) : desc(sortColumn);

    const [items, totalRows] = await Promise.all([
      db.select().from(productions).where(where).orderBy(orderBy).offset((page - 1) * pageSize).fetch(pageSize),
      db.select({ value: count() }).from(productions).where(where),
    ]);

    return { items, total: totalRows[0]?.value ?? 0, page, pageSize };
  },

  async getById(id: number) {
    const [production] = await db.select().from(productions).where(eq(productions.id, id));
    if (!production) throw new NotFoundError(`Producción con id ${id} no encontrada`);

    const [techRows, coauthorRows, documentRows] = await Promise.all([
      db
        .select({ id: technologies.id, name: technologies.name })
        .from(productionTechnologies)
        .innerJoin(technologies, eq(productionTechnologies.technologyId, technologies.id))
        .where(eq(productionTechnologies.productionId, id)),
      db.select().from(productionCoauthors).where(eq(productionCoauthors.productionId, id)),
      db.select().from(documents).where(eq(documents.productionId, id)),
    ]);

    return {
      ...production,
      technologies: techRows,
      coauthors: coauthorRows,
      document: documentRows[0] ?? null,
    };
  },

  async create(input: ProductionInput, ownerId: number) {
    return db.transaction(async (tx) => {
      const [created] = await tx
        .insert(productions)
        .output()
        .values({
          title: input.title,
          author: input.author,
          ownerId,
          productionTypeId: input.productionTypeId,
          categoryId: input.categoryId,
          knowledgeAreaId: input.knowledgeAreaId,
          researchTypeId: input.researchTypeId,
          majorId: input.majorId,
          researchLineId: input.researchLineId,
          year: input.year,
          status: input.status,
          summary: input.summary,
        });

      if (input.technologyIds.length) {
        await tx
          .insert(productionTechnologies)
          .values(input.technologyIds.map((technologyId) => ({ productionId: created.id, technologyId })));
      }
      if (input.coauthorNames.length) {
        await tx
          .insert(productionCoauthors)
          .values(input.coauthorNames.map((coauthorName) => ({ productionId: created.id, coauthorName })));
      }

      return created;
    });
  },

  async update(id: number, input: Partial<ProductionInput>, currentUser: CurrentUser) {
    const [existing] = await db.select().from(productions).where(eq(productions.id, id));
    if (!existing) throw new NotFoundError(`Producción con id ${id} no encontrada`);

    const isOwner = existing.ownerId === currentUser.id;
    const canEditAny = currentUser.role === Role.Administrator || currentUser.role === Role.Coordinator;
    if (!isOwner && !canEditAny) {
      throw new ForbiddenError("Solo el autor o un administrador/coordinador puede editar esta producción");
    }

    return db.transaction(async (tx) => {
      const { technologyIds, coauthorNames, ...fields } = input;

      if (Object.keys(fields).length) {
        await tx.update(productions).set(fields).where(eq(productions.id, id));
      }

      if (technologyIds) {
        await tx.delete(productionTechnologies).where(eq(productionTechnologies.productionId, id));
        if (technologyIds.length) {
          await tx
            .insert(productionTechnologies)
            .values(technologyIds.map((technologyId) => ({ productionId: id, technologyId })));
        }
      }

      if (coauthorNames) {
        await tx.delete(productionCoauthors).where(eq(productionCoauthors.productionId, id));
        if (coauthorNames.length) {
          await tx
            .insert(productionCoauthors)
            .values(coauthorNames.map((coauthorName) => ({ productionId: id, coauthorName })));
        }
      }

      const [updated] = await tx.select().from(productions).where(eq(productions.id, id));
      return updated;
    });
  },

  async remove(id: number, currentUser: CurrentUser) {
    if (currentUser.role !== Role.Administrator && currentUser.role !== Role.Coordinator) {
      throw new ForbiddenError("Solo un administrador o coordinador puede eliminar producciones");
    }
    const [deleted] = await db.delete(productions).output().where(eq(productions.id, id));
    if (!deleted) throw new NotFoundError(`Producción con id ${id} no encontrada`);
  },
};
