/**
 * Material-Katalog für mtb-build
 *
 * Zentraler Preis- und Spezifikations-Lookup. Materialien werden in BOM-Items
 * via `materialSlug` referenziert. Änderungen hier propagieren in alle Module.
 */

import type { BomUnit } from "./BillOfMaterials";

export type MaterialCategory =
  | "holz"
  | "schraube"
  | "beschlag"
  | "fundament"
  | "antirutsch"
  | "armierung"
  | "spezial"
  ;

export interface Material {
  slug: string;             // z.B. "laerche-stringer-80x160"
  name: string;             // z.B. "Lärche Stringer"
  spec: string | null;      // z.B. "80×160 mm sägerau"
  category: MaterialCategory;
  unit: BomUnit;
  pricePerUnit: number;     // CHF
  source: string | null;    // z.B. "Schwere AG", "Lokaler Holzhandel"
  lastUpdate: string;       // ISO-Datum z.B. "2026-04"
}

export type MaterialCatalog = Record<string, Material>;
