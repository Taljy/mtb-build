import { Fragment } from "react";
import type { BillOfMaterials, BomCategory } from "@/types";
import { computeBom } from "@/lib/loader";
import { formatBomQuantity, formatChf } from "@/lib/format";

interface PrintBomTableProps {
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

export default function PrintBomTable({ bom }: PrintBomTableProps) {
  const computed = computeBom(bom);

  const grouped = new Map<BomCategory, typeof computed.items>();
  for (const item of computed.items) {
    if (!grouped.has(item.category)) grouped.set(item.category, []);
    grouped.get(item.category)!.push(item);
  }

  return (
    <div className="print-avoid-break">
      <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-1">
        STÜCKLISTE
      </p>
      <table className="w-full border-collapse text-[8pt]">
        <thead>
          <tr className="border-b border-rule">
            <th className="text-left font-mono text-[7pt] tracking-[0.14em] uppercase text-concrete py-1 pr-2">
              MATERIAL
            </th>
            <th className="text-right font-mono text-[7pt] tracking-[0.14em] uppercase text-concrete py-1 pr-2 whitespace-nowrap">
              MENGE
            </th>
            <th className="text-right font-mono text-[7pt] tracking-[0.14em] uppercase text-concrete py-1 whitespace-nowrap">
              CHF
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from(grouped.entries()).map(([cat, items]) => {
            const subtotal = items.reduce((s, i) => s + i.totalPrice, 0);
            return (
              <Fragment key={cat}>
                <tr className="border-b border-rule">
                  <td
                    colSpan={3}
                    className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt py-0.5 bg-paper-deep"
                  >
                    {CATEGORY_LABELS[cat]}
                  </td>
                </tr>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-rule">
                    <td className="py-0.5 pr-2 text-pitch">
                      {item.name}
                      {item.spec && (
                        <span className="font-mono text-[7pt] text-concrete ml-1">
                          {item.spec}
                        </span>
                      )}
                    </td>
                    <td className="py-0.5 pr-2 text-right font-mono text-asphalt whitespace-nowrap">
                      {formatBomQuantity(item.quantity, item.unit)}
                    </td>
                    <td className="py-0.5 text-right font-mono text-pitch whitespace-nowrap">
                      {item.totalPrice.toFixed(0)}
                    </td>
                  </tr>
                ))}
                <tr className="border-b border-rule">
                  <td
                    colSpan={2}
                    className="py-0.5 pr-2 font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt"
                  >
                    SUBTOTAL
                  </td>
                  <td className="py-0.5 text-right font-mono text-pitch whitespace-nowrap">
                    {subtotal.toFixed(0)}
                  </td>
                </tr>
              </Fragment>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-rule">
            <td
              colSpan={2}
              className="pt-1 font-mono text-[8pt] tracking-[0.18em] uppercase font-bold text-pitch"
            >
              TOTAL
            </td>
            <td className="pt-1 text-right font-mono text-[10pt] font-bold text-pitch whitespace-nowrap">
              {formatChf(computed.totalChf)}
            </td>
          </tr>
        </tfoot>
      </table>
      {computed.notes && (
        <p className="mt-1 font-mono text-[7pt] text-asphalt">{computed.notes}</p>
      )}
    </div>
  );
}
