import { useState, useCallback, useMemo } from "react";
import type { SkillLevel, SkillVariant, ComputedBom, BomCategory } from "@/types";
import { loadModules, computeBom } from "@/lib/loader";

const STORAGE_KEY = "mtb-build:budget-selection-v1";

type Selection = Record<string, SkillLevel | null>;

export interface SelectedModuleEntry {
  module: ReturnType<typeof loadModules>[number];
  variant: SkillVariant;
  computedBom: ComputedBom;
}

function defaultSelection(): Selection {
  const modules = loadModules();
  const sel: Selection = {};
  for (const m of modules) {
    const mittel = m.variants.find((v) => v.level === "mittel");
    sel[m.slug] = mittel ? "mittel" : m.variants[0]?.level ?? null;
  }
  return sel;
}

function readStorage(): Selection | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as Selection;
  } catch {
    return null;
  }
}

function writeStorage(sel: Selection): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sel));
  } catch {
    // private browsing or storage full — silently skip
  }
}

export function useBudgetSelection() {
  const [selection, setSelection] = useState<Selection>(
    () => readStorage() ?? defaultSelection()
  );

  const modules = useMemo(() => loadModules(), []);

  const setVariant = useCallback((slug: string, level: SkillLevel | null) => {
    setSelection((prev) => {
      const next = { ...prev, [slug]: level };
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelection((prev) => {
      const next: Selection = {};
      for (const slug of Object.keys(prev)) next[slug] = null;
      writeStorage(next);
      return next;
    });
  }, []);

  const selectedModules = useMemo((): SelectedModuleEntry[] => {
    const result: SelectedModuleEntry[] = [];
    for (const m of modules) {
      const level = selection[m.slug];
      if (!level) continue;
      const variant = m.variants.find((v) => v.level === level);
      if (!variant) continue;
      result.push({ module: m, variant, computedBom: computeBom(variant.bom) });
    }
    return result;
  }, [modules, selection]);

  const computedBoms = useMemo(
    () => selectedModules.map((e) => e.computedBom),
    [selectedModules]
  );

  const totalChf = useMemo(
    () => selectedModules.reduce((sum, e) => sum + e.computedBom.totalChf, 0),
    [selectedModules]
  );

  const byCategory = useMemo((): Record<BomCategory, number> => {
    const acc: Record<BomCategory, number> = {
      tragwerk: 0,
      belag: 0,
      verbindung: 0,
      fundament: 0,
      oberflaeche: 0,
      armierung: 0,
      spezial: 0,
    };
    for (const entry of selectedModules) {
      for (const item of entry.computedBom.items) {
        acc[item.category] = (acc[item.category] ?? 0) + item.totalPrice;
      }
    }
    return acc;
  }, [selectedModules]);

  return {
    selection,
    setVariant,
    clearAll,
    selectedModules,
    computedBoms,
    totalChf,
    byCategory,
  };
}
