import { createEntityApi } from "./entityApi";
import {
  areasSeed,
  carrerasSeed,
  categoriasSeed,
  lineasSeed,
  tecnologiasSeed,
  tiposInvestigacionSeed,
  tiposProduccionSeed,
} from "./seedData";
import { storageKeys } from "./storageKeys";
import type { CatalogItem } from "./types";

export const tiposProduccionApi = createEntityApi<CatalogItem>(
  tiposProduccionSeed,
  storageKeys.catalog("tipos"),
);
export const categoriasApi = createEntityApi<CatalogItem>(
  categoriasSeed,
  storageKeys.catalog("categorias"),
);
export const areasApi = createEntityApi<CatalogItem>(
  areasSeed,
  storageKeys.catalog("areas"),
);
export const tecnologiasApi = createEntityApi<CatalogItem>(
  tecnologiasSeed,
  storageKeys.catalog("tecnologias"),
);
export const tiposInvestigacionApi = createEntityApi<CatalogItem>(
  tiposInvestigacionSeed,
  storageKeys.catalog("tipos-investigacion"),
);
export const carrerasApi = createEntityApi<CatalogItem>(
  carrerasSeed,
  storageKeys.catalog("carreras"),
);
export const lineasApi = createEntityApi<CatalogItem>(
  lineasSeed,
  storageKeys.catalog("lineas"),
);
