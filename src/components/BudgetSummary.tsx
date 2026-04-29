import { useState } from "react";
import type { Module, SkillVariant, ComputedBom, BomCategory } from "@/types";
import { formatChf } from "@/lib/format";
import CsvExportButton from "@/components/CsvExportButton";

interface SelectedModuleEntry {
  module: Module;
  variant: SkillVariant;
  computedBom: ComputedBom;
}

interface BudgetSummaryProps {
  selectedCount: number;
  totalModules: number;
  totalChf: number;
  byCategory: Record<BomCategory, number>;
  selectedModules: SelectedModuleEntry[];
  onClear: () => void;
}

const CATEGORY_LABELS: Record<BomCategory, string> = {
  tragwerk:    "TRAGWERK",
  belag:       "BELAG",
  verbindung:  "VERBINDUNG",
  fundament:   "FUNDAMENT",
  oberflaeche: "OBERFLÄCHE",
  armierung:   "ARMIERUNG",
  spezial:     "SPEZIAL",
};

export default function BudgetSummary({
  selectedCount,
  totalModules,
  totalChf,
  byCategory,
  selectedModules,
  onClear,
}: BudgetSummaryProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const categoryEntries = (Object.entries(byCategory) as [BomCategory, number][]).filter(
    ([, v]) => v > 0
  );

  return (
    <div className="sticky bottom-0 z-40 bg-paper border-t border-rule">
      {/* Expandable detail block */}
      {detailsOpen && categoryEntries.length > 0 && (
        <div className="border-b border-rule px-6 py-3">
          <div className="flex flex-wrap gap-x-8 gap-y-1">
            {categoryEntries.map(([cat, amount]) => (
              <div key={cat} className="flex items-baseline gap-2">
                <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-concrete">
                  {CATEGORY_LABELS[cat]}
                </span>
                <span className="font-mono text-xs text-asphalt">
                  {formatChf(amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main bar */}
      <div className="flex items-center gap-6 px-6 py-4">
        {/* Left: count + details toggle */}
        <div className="flex flex-col gap-0.5">
          <span className="font-mono text-xs tracking-[0.14em] text-asphalt">
            {selectedCount} von {totalModules} Modulen
          </span>
          <button
            type="button"
            onClick={() => setDetailsOpen((o) => !o)}
            className="font-mono text-[10px] tracking-[0.14em] uppercase text-concrete hover:text-vermillion transition-colors text-left"
          >
            {detailsOpen ? "↑ DETAILS" : "↓ DETAILS"}
          </button>
        </div>

        {/* Middle: total */}
        <div className="flex-1 text-center">
          <span className="font-display text-3xl text-pitch leading-none">
            {formatChf(totalChf)}
          </span>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-3 shrink-0">
          <CsvExportButton selectedModules={selectedModules} />
          <button
            type="button"
            onClick={onClear}
            className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt hover:text-ink transition-colors"
          >
            ZURÜCKSETZEN
          </button>
        </div>
      </div>
    </div>
  );
}
