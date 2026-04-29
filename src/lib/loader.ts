/**
 * Daten-Loader für mtb-build
 *
 * Lädt Module, Material-Katalog und Plan aus JSON, validiert Cross-References,
 * berechnet BOM-Totale on-the-fly aus Material-Preisen.
 *
 * Verwendung:
 *   import { loadModules, computeBom, getModule } from "@/lib/loader";
 *   const modules = loadModules();
 *   const computed = computeBom(modules[0].variants[0].bom);
 */

import moduleData from "@/data/module.json";
import materialData from "@/data/material.json";
import planData from "@/data/plan.json";

import type {
  Module,
  Material,
  MaterialCatalog,
  BillOfMaterials,
  ComputedBom,
  ComputedBomItem,
  Plan,
} from "@/types";

// ────────────────────────────────────────────────────────────────────
// Loader (mit Cast — JSON ist statisch validiert via Build-Script)
// ────────────────────────────────────────────────────────────────────

export function loadModules(): Module[] {
  return moduleData as Module[];
}

export function loadMaterials(): MaterialCatalog {
  return materialData as MaterialCatalog;
}

export function loadPlan(): Plan {
  return planData as Plan;
}

// ────────────────────────────────────────────────────────────────────
// Lookup-Helfer
// ────────────────────────────────────────────────────────────────────

export function getModule(slug: string): Module | undefined {
  return loadModules().find((m) => m.slug === slug);
}

export function getMaterial(slug: string): Material | undefined {
  return loadMaterials()[slug];
}

export function getModulesByPhase(phase: 1 | 2 | 3 | 4 | 5): Module[] {
  return loadModules().filter((m) => m.buildPhase === phase);
}

export function getModulesByCategory(category: Module["category"]): Module[] {
  return loadModules().filter((m) => m.category === category);
}

// ────────────────────────────────────────────────────────────────────
// BOM-Berechnung
// ────────────────────────────────────────────────────────────────────

/**
 * Rechnet ein BOM in ein ComputedBom mit aufgelösten Preisen um.
 * Items mit unbekannter materialSlug werden mit pricePerUnit=0 markiert
 * und im UI sichtbar gemacht (defensive coding).
 */
export function computeBom(bom: BillOfMaterials): ComputedBom {
  const materials = loadMaterials();
  const items: ComputedBomItem[] = bom.items.map((item) => {
    const material = materials[item.materialSlug];
    if (!material) {
      console.warn(`Unknown materialSlug: ${item.materialSlug}`);
      return {
        ...item,
        name: `[UNKNOWN] ${item.materialSlug}`,
        spec: null,
        unit: "stk",
        pricePerUnit: 0,
        totalPrice: 0,
      };
    }
    return {
      ...item,
      name: material.name,
      spec: material.spec,
      unit: material.unit,
      pricePerUnit: material.pricePerUnit,
      totalPrice: round2(item.quantity * material.pricePerUnit),
    };
  });

  const totalChf = round2(items.reduce((sum, i) => sum + i.totalPrice, 0));

  return {
    items,
    totalChf,
    notes: bom.notes,
  };
}

/**
 * Range über alle Skill-Varianten eines Moduls.
 */
export function getModulePriceRange(module: Module): { min: number; max: number } {
  const totals = module.variants.map((v) => computeBom(v.bom).totalChf);
  return {
    min: Math.min(...totals),
    max: Math.max(...totals),
  };
}

/**
 * Aggregierte Stückliste über mehrere Module (für Budget-Konfigurator).
 * Mengen pro Material werden summiert.
 */
export function aggregateBoms(boms: BillOfMaterials[]): ComputedBom {
  const merged = new Map<string, number>();
  for (const bom of boms) {
    for (const item of bom.items) {
      merged.set(item.materialSlug, (merged.get(item.materialSlug) ?? 0) + item.quantity);
    }
  }
  const items = Array.from(merged.entries()).map(([slug, qty]) => ({
    category: "tragwerk" as const, // wird später aus dem ersten Item übernommen
    materialSlug: slug,
    quantity: qty,
  }));
  return computeBom({ items, notes: null });
}

// ────────────────────────────────────────────────────────────────────
// Utils
// ────────────────────────────────────────────────────────────────────

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
