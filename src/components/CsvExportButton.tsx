import type { Module, SkillVariant, ComputedBom } from "@/types";
import { skillLabel } from "@/lib/format";

interface SelectedModuleEntry {
  module: Module;
  variant: SkillVariant;
  computedBom: ComputedBom;
}

interface CsvExportButtonProps {
  selectedModules: SelectedModuleEntry[];
}

const UNIT_LABELS: Record<string, string> = {
  stk: "Stk",
  lfm: "lfm",
  m2:  "m²",
  kg:  "kg",
};

function buildCsv(selectedModules: SelectedModuleEntry[]): string {
  const rows: string[] = [];

  rows.push(
    ["Modul", "Variante", "Material", "Spec", "Menge", "Einheit", "CHF/Einheit", "CHF"].join(";")
  );

  let grandTotal = 0;

  for (const { module, variant, computedBom } of selectedModules) {
    const moduleName = `${module.number} ${module.name}`;
    const variantName = skillLabel(variant.level, true);

    for (const item of computedBom.items) {
      rows.push(
        [
          moduleName,
          variantName,
          item.name,
          item.spec ?? "",
          item.quantity.toString().replace(".", ","),
          UNIT_LABELS[item.unit] ?? item.unit,
          item.pricePerUnit.toFixed(2).replace(".", ","),
          item.totalPrice.toFixed(2).replace(".", ","),
        ].join(";")
      );
    }

    rows.push(
      [
        moduleName,
        variantName,
        "SUBTOTAL",
        "",
        "",
        "",
        "",
        computedBom.totalChf.toFixed(2).replace(".", ","),
      ].join(";")
    );

    grandTotal += computedBom.totalChf;
  }

  rows.push(
    [
      "TOTAL",
      "",
      "",
      "",
      "",
      "",
      "",
      grandTotal.toFixed(2).replace(".", ","),
    ].join(";")
  );

  return rows.join("\r\n");
}

export default function CsvExportButton({ selectedModules }: CsvExportButtonProps) {
  function handleExport() {
    if (selectedModules.length === 0) return;

    const csv = buildCsv(selectedModules);
    const bom = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(bom);
    const today = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mtb-build-budget-${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={selectedModules.length === 0}
      className="font-mono text-xs tracking-[0.18em] uppercase border border-vermillion text-vermillion px-3 py-1.5 hover:bg-vermillion hover:text-paper transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      CSV EXPORT
    </button>
  );
}
