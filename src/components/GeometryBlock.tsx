import { Link } from "react-router-dom";
import type { SkillVariant } from "@/types";
import { formatLength, formatAngle, formatSpeedRange } from "@/lib/format";
import Eyebrow from "./Eyebrow";

interface GeometryBlockProps {
  variant: SkillVariant;
}

type StatRow = { label: string; value: string };

function buildCalcLink(variant: SkillVariant): string | null {
  const g = variant.geometry;
  if (!g) return null;

  if (g.type === "jump") {
    const p = new URLSearchParams();
    p.set("angle", String(g.lipAngle));
    p.set("height", String(g.lipHeight));
    if (variant.recommendedSpeed) p.set("speed", String(variant.recommendedSpeed.max));
    return `/geometrie/sprung?${p.toString()}`;
  }
  if (g.type === "berm") {
    const p = new URLSearchParams();
    p.set("radius", String(g.radius));
    if (variant.recommendedSpeed) p.set("speed", String(variant.recommendedSpeed.max));
    return `/geometrie/anlieger?${p.toString()}`;
  }
  return null;
}

export default function GeometryBlock({ variant }: GeometryBlockProps) {
  const d = variant.dimensions;

  const rows: StatRow[] = [
    { label: "LÄNGE",  value: formatLength(d.length) },
    { label: "BREITE", value: formatLength(d.width) },
    { label: "HÖHE",   value: formatLength(d.height) },
  ];
  if (d.angle !== null)  rows.push({ label: "WINKEL", value: formatAngle(d.angle) });
  if (d.radius !== null) rows.push({ label: "RADIUS", value: formatLength(d.radius) });
  rows.push({ label: "SPEED", value: formatSpeedRange(variant.recommendedSpeed) });

  const calcLink = buildCalcLink(variant);

  return (
    <div>
      <Eyebrow>MASSE & GEOMETRIE</Eyebrow>
      <div className="border border-rule divide-y divide-rule">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between px-3 py-2">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              {row.label}
            </span>
            <span className="font-mono text-sm text-ink">{row.value}</span>
          </div>
        ))}
      </div>

      {calcLink && (
        <Link
          to={calcLink}
          className="mt-3 flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] uppercase text-vermillion no-underline transition-colors hover:text-vermillion-deep"
        >
          → IM RECHNER ÖFFNEN
        </Link>
      )}
    </div>
  );
}
