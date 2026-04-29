import type { SkillVariant } from "@/types";
import { formatLength, formatAngle, formatSpeedRange } from "@/lib/format";

interface PrintGeometryBlockProps {
  variant: SkillVariant;
}

type StatRow = { label: string; value: string };

export default function PrintGeometryBlock({ variant }: PrintGeometryBlockProps) {
  const d = variant.dimensions;
  const g = variant.geometry;

  const rows: StatRow[] = [];
  if (d.length !== null)  rows.push({ label: "LÄNGE",  value: formatLength(d.length) });
  if (d.width  !== null)  rows.push({ label: "BREITE", value: formatLength(d.width) });
  if (d.height !== null)  rows.push({ label: "HÖHE",   value: formatLength(d.height) });
  if (d.angle  !== null)  rows.push({ label: "WINKEL", value: formatAngle(d.angle) });
  if (d.radius !== null)  rows.push({ label: "RADIUS", value: formatLength(d.radius) });
  rows.push({ label: "SPEED", value: formatSpeedRange(variant.recommendedSpeed) });

  // Geometry-specific extra rows
  if (g?.type === "jump") {
    rows.push({ label: "LIPPENWINKEL", value: formatAngle(g.lipAngle) });
    rows.push({ label: "LIPPENHÖHE",   value: formatLength(g.lipHeight) });
    rows.push({ label: "WEITE",        value: `${g.jumpDistance} m` });
    rows.push({ label: "TAKEOFF",      value: g.takeoffShape });
  }
  if (g?.type === "berm") {
    rows.push({ label: "RADIUS",    value: `${g.radius} m` });
    rows.push({ label: "BANKWINKEL", value: formatAngle(g.bankAngle) });
    rows.push({ label: "BOGEN",     value: `${g.arcDegrees}°` });
  }
  if (g?.type === "drop") {
    rows.push({ label: "DROP",         value: formatLength(g.dropHeight) });
    rows.push({ label: "LANDUNGSWINKEL", value: formatAngle(g.landingAngle) });
  }
  if (g?.type === "skinny") {
    rows.push({ label: "LAUFBREITE", value: formatLength(g.beltWidth) });
    rows.push({ label: "HÖHE",       value: formatLength(g.beamHeight) });
  }
  if (g?.type === "northshore") {
    rows.push({ label: "BREITE",       value: formatLength(g.beltWidth) });
    rows.push({ label: "HÖHE",         value: formatLength(g.beamHeight) });
    rows.push({ label: "GESAMTLÄNGE",  value: `${g.totalLength} m` });
  }

  return (
    <div className="print-avoid-break">
      <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-1">
        MASSE & GEOMETRIE
      </p>
      <table className="w-full text-[9pt] border-collapse">
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.label}-${i}`} className="border-b border-rule">
              <td className="font-mono text-[8pt] tracking-[0.14em] uppercase text-asphalt py-1 pr-3 whitespace-nowrap">
                {row.label}
              </td>
              <td className="font-mono text-[9pt] text-pitch py-1 text-right whitespace-nowrap">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
