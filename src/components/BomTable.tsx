import type { BillOfMaterials, BomCategory } from "@/types";
import { computeBom } from "@/lib/loader";
import { formatBomQuantity, formatChf } from "@/lib/format";
import Eyebrow from "./Eyebrow";

interface BomTableProps {
  bom: BillOfMaterials;
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

export default function BomTable({ bom }: BomTableProps) {
  const computed = computeBom(bom);

  // group by category, preserve insertion order
  const grouped = new Map<BomCategory, typeof computed.items>();
  for (const item of computed.items) {
    if (!grouped.has(item.category)) grouped.set(item.category, []);
    grouped.get(item.category)!.push(item);
  }

  return (
    <div>
      <Eyebrow>STÜCKLISTE</Eyebrow>
      <div className="border border-rule">
        {Array.from(grouped.entries()).map(([cat, items]) => {
          const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
          return (
            <div key={cat}>
              {/* Category header */}
              <div className="border-b border-rule bg-paper px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-asphalt">
                {CATEGORY_LABELS[cat] ?? cat.toUpperCase()}
              </div>

              {/* Items */}
              {items.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[1fr_auto_auto] gap-3 border-b border-rule-soft px-3 py-2 text-xs"
                >
                  <div className="min-w-0">
                    <span className="text-ink">{item.name}</span>
                    {item.spec && (
                      <span className="ml-2 font-mono text-[10px] text-concrete">
                        {item.spec}
                      </span>
                    )}
                  </div>
                  <span className="whitespace-nowrap font-mono text-asphalt">
                    {formatBomQuantity(item.quantity, item.unit)}
                  </span>
                  <span className="whitespace-nowrap text-right font-mono text-ink">
                    {formatChf(item.totalPrice)}
                  </span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="flex justify-between border-b border-rule bg-paper-deep px-3 py-2 font-mono text-xs uppercase tracking-[0.18em]">
                <span className="text-asphalt">
                  SUBTOTAL {CATEGORY_LABELS[cat] ?? cat.toUpperCase()}
                </span>
                <span className="text-ink">{formatChf(subtotal)}</span>
              </div>
            </div>
          );
        })}

        {/* Grand total */}
        <div className="flex items-baseline justify-between px-3 py-4">
          <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
            TOTAL
          </span>
          <span className="display-s text-pitch">{formatChf(computed.totalChf)}</span>
        </div>
      </div>

      {computed.notes && (
        <p className="mt-3 font-mono text-[11px] leading-relaxed tracking-[0.12em] text-asphalt">
          {computed.notes}
        </p>
      )}
    </div>
  );
}
