import { inArray } from "drizzle-orm";
import { db } from "../config/db.js";
import { env } from "../config/env.js";
import { knowledgeAreas, technologies } from "../models/index.js";

const OPENALEX_BASE = "https://api.openalex.org";
const COMPUTER_SCIENCE_FIELD_ID = "fields/17";
const MAX_NAME_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 400;

interface OpenAlexTaxonomyNode {
  display_name: string;
  description?: string | null;
}

interface CatalogSyncResult {
  total: number;
  created: number;
  skipped: number;
}

function truncate(value: string, maxLength: number): string {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

async function fetchOpenAlex<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${OPENALEX_BASE}${path}`);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value);
  if (env.OPEN_ALEX_API_KEY) url.searchParams.set("api_key", env.OPEN_ALEX_API_KEY);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`OpenAlex respondió ${response.status} al llamar a ${path}`);
  }
  return response.json() as Promise<T>;
}

async function fetchFields(): Promise<OpenAlexTaxonomyNode[]> {
  const data = await fetchOpenAlex<{ results: OpenAlexTaxonomyNode[] }>("/fields", { "per-page": "50" });
  return data.results;
}

async function fetchComputerScienceSubfields(): Promise<OpenAlexTaxonomyNode[]> {
  const data = await fetchOpenAlex<{ results: OpenAlexTaxonomyNode[] }>("/subfields", {
    filter: `field.id:${COMPUTER_SCIENCE_FIELD_ID}`,
    "per-page": "50",
  });
  return data.results;
}

async function upsertCatalog(table: any, nodes: OpenAlexTaxonomyNode[]): Promise<CatalogSyncResult> {
  const seen = new Set<string>();
  const candidates = nodes
    .map((node) => ({
      name: truncate(node.display_name, MAX_NAME_LENGTH),
      description: truncate(node.description?.trim() || node.display_name, MAX_DESCRIPTION_LENGTH),
    }))
    .filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });

  if (!candidates.length) return { total: 0, created: 0, skipped: 0 };

  const existingRows = await db
    .select({ name: table.name })
    .from(table)
    .where(inArray(table.name, candidates.map((c) => c.name)));
  const existingNames = new Set(existingRows.map((r) => r.name));

  const toInsert = candidates.filter((c) => !existingNames.has(c.name));
  if (toInsert.length) {
    await db.insert(table).values(toInsert);
  }

  return { total: candidates.length, created: toInsert.length, skipped: candidates.length - toInsert.length };
}

export const openAlexService = {
  async syncCatalogs() {
    const [fields, subfields] = await Promise.all([fetchFields(), fetchComputerScienceSubfields()]);
    const [knowledgeAreaResult, technologyResult] = await Promise.all([
      upsertCatalog(knowledgeAreas, fields),
      upsertCatalog(technologies, subfields),
    ]);
    return { knowledgeAreas: knowledgeAreaResult, technologies: technologyResult };
  },
};
