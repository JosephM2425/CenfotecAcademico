import { count, desc, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { knowledgeAreas, majors, productionTechnologies, productions, researchLines, technologies } from "../models/index.js";

const TOP_TECHNOLOGIES_LIMIT = 10;

export const dashboardService = {
  async getStats() {
    const [byYear, byMajor, byKnowledgeArea, byResearchLine, topTechnologies] = await Promise.all([
      db
        .select({ year: productions.year, total: count() })
        .from(productions)
        .groupBy(productions.year)
        .orderBy(productions.year),

      db
        .select({ id: majors.id, name: majors.name, total: count() })
        .from(productions)
        .innerJoin(majors, eq(productions.majorId, majors.id))
        .groupBy(majors.id, majors.name)
        .orderBy(desc(count())),

      db
        .select({ id: knowledgeAreas.id, name: knowledgeAreas.name, total: count() })
        .from(productions)
        .innerJoin(knowledgeAreas, eq(productions.knowledgeAreaId, knowledgeAreas.id))
        .groupBy(knowledgeAreas.id, knowledgeAreas.name)
        .orderBy(desc(count())),

      db
        .select({ id: researchLines.id, name: researchLines.name, total: count() })
        .from(productions)
        .innerJoin(researchLines, eq(productions.researchLineId, researchLines.id))
        .groupBy(researchLines.id, researchLines.name)
        .orderBy(desc(count())),

      db
        .select({ id: technologies.id, name: technologies.name, total: count() })
        .from(productionTechnologies)
        .innerJoin(technologies, eq(productionTechnologies.technologyId, technologies.id))
        .groupBy(technologies.id, technologies.name)
        .orderBy(desc(count()))
        .offset(0)
        .fetch(TOP_TECHNOLOGIES_LIMIT),
    ]);

    return { byYear, byMajor, byKnowledgeArea, byResearchLine, topTechnologies };
  },
};
