import { useParams } from "react-router-dom";
import { getModule, loadPlan, computeBom } from "@/lib/loader";
import {
  moduleSlug,
  skillLabel,
  formatLength,
  foundationLabel,
  formatChf,
} from "@/lib/format";
import PrintHeader from "@/components/print/PrintHeader";
import PrintFooter from "@/components/print/PrintFooter";
import PrintGeometryBlock from "@/components/print/PrintGeometryBlock";
import PrintBomTable from "@/components/print/PrintBomTable";
import PrintSafetyBlock from "@/components/print/PrintSafetyBlock";
import type { SkillVariant } from "@/types";

function getMainDim(variant: SkillVariant): string {
  const d = variant.dimensions;
  const g = variant.geometry;
  if (g?.type === "jump" && d.height !== null) return `${d.height} cm Lippe · ${d.angle ?? ""}°`;
  if (g?.type === "drop" && d.height !== null) return `${d.height} cm Drop`;
  if (g?.type === "berm" && g.radius !== null) return `${g.radius} m Radius`;
  if (d.height !== null) return formatLength(d.height);
  if (d.length !== null) return formatLength(d.length);
  return "";
}

export default function PrintSheet() {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getModule(slug) : undefined;

  if (!module) {
    return (
      <div className="p-8 font-mono text-xs">
        MODUL «{slug}» nicht gefunden.
      </div>
    );
  }

  const plan = loadPlan();
  const phase = plan.find((p) => p.number === module.buildPhase);
  const slugLine = moduleSlug(module);

  return (
    <div className="p-6 bg-white min-h-screen text-[10pt]">
      <PrintHeader
        title={module.name}
        subtitle={`PHASE ${module.buildPhase}${phase ? " · " + phase.title : ""}`}
        slug={slugLine}
      />

      {/* Module identity */}
      <div className="mb-6">
        <h1
          style={{ fontFamily: "var(--font-display)", fontSize: "28pt", lineHeight: 0.92 }}
          className="text-pitch uppercase"
        >
          {module.name}
        </h1>
        <p className="mt-1 font-serif italic text-asphalt text-[11pt] leading-snug max-w-[70ch]">
          {module.tagline}
        </p>
        <p className="mt-2 text-[9pt] text-asphalt leading-relaxed max-w-[70ch]">
          {module.description}
        </p>
      </div>

      {/* Skill variants — one page per variant */}
      {module.variants.map((variant, i) => (
        <div
          key={variant.level}
          className={i > 0 ? "print-break-before" : ""}
        >
          {/* Variant header */}
          <div className="border-t border-rule pt-4 mb-4">
            <p
              style={{ fontFamily: "var(--font-display)", fontSize: "16pt", lineHeight: 1 }}
              className="text-pitch uppercase"
            >
              {skillLabel(variant.level, true)} — {getMainDim(variant)}
            </p>
            {variant.characterNote && (
              <p className="mt-1 font-serif italic text-[9pt] text-asphalt">
                {variant.characterNote}
              </p>
            )}
          </div>

          {/* Geometry + BOM side by side */}
          <div className="grid grid-cols-2 gap-6 print-avoid-break">
            <PrintGeometryBlock variant={variant} />
            <PrintBomTable bom={variant.bom} />
          </div>

          {/* Safety */}
          <PrintSafetyBlock
            safety={module.safety}
            safetyClearance={variant.safetyClearance}
          />
        </div>
      ))}

      {/* Final page: prefab + foundation + sources */}
      <div className="print-break-before">
        <PrintHeader
          title={module.name}
          subtitle="VORFERTIGUNG & QUELLEN"
          slug={slugLine}
        />

        {/* Prefab */}
        <div className="mb-6">
          <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-2">
            VORFERTIGUNG
          </p>
          <div className="grid grid-cols-3 gap-0 border border-rule">
            <div className="p-3 border-r border-rule">
              <p className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt mb-1">
                WERKSTATT
              </p>
              <p
                style={{ fontFamily: "var(--font-display)", fontSize: "24pt", lineHeight: 1 }}
                className="text-pitch"
              >
                {module.prefab.workshopPercent}%
              </p>
              {module.prefab.cncAdvantage && (
                <p className="font-mono text-[7pt] uppercase text-asphalt mt-1">CNC-Vorteil</p>
              )}
            </div>
            <div className="p-3 border-r border-rule">
              <p className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt mb-1">
                WERKSTATT-PARTS
              </p>
              {module.prefab.workshopParts.map((p) => (
                <p key={p} className="text-[8pt] text-pitch leading-snug">— {p}</p>
              ))}
            </div>
            <div className="p-3">
              <p className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt mb-1">
                VOR ORT
              </p>
              {module.prefab.onSiteParts.map((p) => (
                <p key={p} className="text-[8pt] text-pitch leading-snug">— {p}</p>
              ))}
            </div>
          </div>
          {module.prefab.cncNote && (
            <p className="mt-2 text-[8pt] text-asphalt italic">{module.prefab.cncNote}</p>
          )}
        </div>

        {/* Foundation */}
        <div className="mb-6">
          <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-1">
            FUNDAMENT
          </p>
          <p className="text-[9pt] text-pitch">
            {module.foundation.map(foundationLabel).join(" · ")}
          </p>
          {module.foundationNote && (
            <p className="mt-1 text-[8pt] text-asphalt">{module.foundationNote}</p>
          )}
        </div>

        {/* Budget summary across all variants */}
        <div className="mb-6">
          <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-2">
            BUDGET ALLE VARIANTEN
          </p>
          <div className="flex gap-8">
            {module.variants.map((v) => (
              <div key={v.level}>
                <p className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt">
                  {skillLabel(v.level)}
                </p>
                <p
                  style={{ fontFamily: "var(--font-display)", fontSize: "14pt", lineHeight: 1 }}
                  className="text-pitch"
                >
                  {formatChf(computeBom(v.bom).totalChf)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Sources */}
        {module.references.length > 0 && (
          <div className="mb-8">
            <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-1">
              QUELLEN
            </p>
            {module.references.map((r) => (
              <p key={r} className="font-mono text-[8pt] text-asphalt">— {r}</p>
            ))}
          </div>
        )}

        <PrintFooter />
      </div>
    </div>
  );
}
