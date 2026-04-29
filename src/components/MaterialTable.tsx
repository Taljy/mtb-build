import type { MaterialCategory, Material } from "@/types";
import Eyebrow from "@/components/Eyebrow";

interface MaterialTableProps {
  category: MaterialCategory;
  materials: Material[];
}

const CATEGORY_LABELS: Record<MaterialCategory, string> = {
  holz:       "HOLZ",
  schraube:   "SCHRAUBEN",
  beschlag:   "BESCHLÄGE",
  fundament:  "FUNDAMENTE",
  antirutsch: "ANTIRUTSCH",
  armierung:  "ARMIERUNG",
  spezial:    "SPEZIAL",
};

const UNIT_LABELS: Record<string, string> = {
  stk: "Stk",
  lfm: "lfm",
  m2:  "m²",
  kg:  "kg",
};

export default function MaterialTable({ category, materials }: MaterialTableProps) {
  if (materials.length === 0) return null;

  return (
    <div className="mb-8">
      <Eyebrow>
        {CATEGORY_LABELS[category]} · {materials.length} MATERIALIEN
      </Eyebrow>

      <div className="overflow-x-auto">
        <table className="w-full border border-rule text-sm">
          <thead>
            <tr className="border-b border-rule">
              {["NAME", "SPEC", "EINHEIT", "CHF/EINHEIT", "QUELLE", "STAND"].map((h) => (
                <th
                  key={h}
                  className="px-3 py-2 text-left font-mono text-[10px] tracking-[0.18em] text-concrete uppercase whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-rule">
            {materials.map((m) => (
              <tr key={m.slug} className="hover:bg-paper-deep transition-colors">
                <td className="px-3 py-2 font-mono text-xs text-ink whitespace-nowrap">
                  {m.name}
                </td>
                <td className="px-3 py-2 text-xs text-asphalt">
                  {m.spec ?? "—"}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-asphalt whitespace-nowrap">
                  {UNIT_LABELS[m.unit] ?? m.unit}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-ink whitespace-nowrap">
                  {m.pricePerUnit.toFixed(2)}
                </td>
                <td className="px-3 py-2 text-xs text-asphalt whitespace-nowrap">
                  {m.source ?? "—"}
                </td>
                <td className="px-3 py-2 font-mono text-[10px] text-concrete whitespace-nowrap">
                  {m.lastUpdate}
                </td>
              </tr>
            ))}
            <tr>
              <td
                colSpan={6}
                className="px-3 py-2 font-mono text-[10px] tracking-[0.14em] text-concrete uppercase"
              >
                PREISE OHNE GEWÄHR · STAND APRIL 2026
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
