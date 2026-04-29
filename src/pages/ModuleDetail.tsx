import { Link, useParams } from "react-router-dom";
import type { SkillLevel, SkillVariant } from "@/types";
import { getModule } from "@/lib/loader";
import { moduleSlug, skillLabel, formatLength, foundationLabel } from "@/lib/format";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Eyebrow from "@/components/Eyebrow";
import SkillBadge from "@/components/SkillBadge";
import GeometryBlock from "@/components/GeometryBlock";
import BomTable from "@/components/BomTable";
import SafetyBlock from "@/components/SafetyBlock";
import PrefabDonut from "@/components/PrefabDonut";
import PhaseRef from "@/components/PhaseRef";
function getMainDim(variant: SkillVariant): string {
  const d = variant.dimensions;
  const g = variant.geometry;
  if (g?.type === "jump"  && d.height !== null) return `${d.height} cm Lippe`;
  if (g?.type === "drop"  && d.height !== null) return `${d.height} cm Drop`;
  if (g?.type === "berm"  && g.radius !== null) return `${g.radius} m Radius`;
  if (d.height !== null)  return formatLength(d.height);
  if (d.width  !== null)  return formatLength(d.width);
  return "";
}

export default function ModuleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const module = slug ? getModule(slug) : undefined;

  if (!module) {
    return (
      <div className="py-24">
        <Eyebrow accent>404</Eyebrow>
        <h1>MODUL NICHT GEFUNDEN</h1>
        <Link
          to="/module"
          className="mt-6 inline-block font-mono text-xs tracking-[0.18em] uppercase text-vermillion no-underline hover:text-vermillion-deep"
        >
          ← ZURÜCK ZUR ÜBERSICHT
        </Link>
      </div>
    );
  }

  const defaultTab: SkillLevel =
    module.variants.find((v) => v.level === "mittel")?.level ?? module.variants[0].level;

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────── */}
      <section className="border-b border-rule py-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow accent>{moduleSlug(module)}</Eyebrow>
            <h1 className="display-l text-pitch">{module.nameLong}</h1>
            <p className="mt-4 max-w-xl font-serif text-2xl italic text-asphalt">
              {module.tagline}
            </p>
            <p className="mt-4 max-w-2xl leading-relaxed text-ink">
              {module.description}
            </p>
          </div>
          <Link
            to={`/print/${module.slug}`}
            className="shrink-0 font-mono text-xs tracking-[0.18em] uppercase text-vermillion no-underline transition-colors hover:text-vermillion-deep"
          >
            DRUCKEN A4 →
          </Link>
        </div>
      </section>

      {/* ── Skill Tabs ─────────────────────────────────────── */}
      <section className="mt-12">
        <Tabs defaultValue={defaultTab}>
          <TabsList className="h-auto w-full justify-start rounded-none border-b border-rule bg-transparent p-0">
            {module.variants.map((v) => (
              <TabsTrigger
                key={v.level}
                value={v.level}
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-1 shadow-none data-[state=active]:border-vermillion data-[state=active]:shadow-none"
              >
                <SkillBadge level={v.level} />
                <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt data-[state=active]:text-ink">
                  {skillLabel(v.level, true)}
                </span>
                {getMainDim(v) && (
                  <span className="font-mono text-xs text-concrete">
                    · {getMainDim(v)}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {module.variants.map((v) => (
            <TabsContent key={v.level} value={v.level} className="mt-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Left: Geometry + Safety */}
                <div className="flex flex-col gap-8">
                  <GeometryBlock variant={v} />
                  <SafetyBlock safety={module.safety} safetyClearance={v.safetyClearance} />
                </div>
                {/* Right: BOM */}
                <BomTable bom={v.bom} />
              </div>

              {v.characterNote && (
                <p className="mt-6 font-serif text-lg italic text-asphalt">
                  {v.characterNote}
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* ── Vorfertigung ───────────────────────────────────── */}
      <section className="mt-12 border-t border-rule pt-12">
        <h2 className="display-m text-pitch mb-8">VORFERTIGUNG</h2>
        <PrefabDonut prefab={module.prefab} />

        <div className="mt-6 border-t border-rule pt-6">
          <p className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
            FUNDAMENT:{" "}
            <span className="text-ink">
              {module.foundation.map(foundationLabel).join(" · ")}
            </span>
          </p>
          {module.foundationNote && (
            <p className="mt-2 text-sm leading-relaxed text-asphalt">
              {module.foundationNote}
            </p>
          )}
        </div>
      </section>

      {/* ── Phase reference ────────────────────────────────── */}
      <section className="mt-12 border-t border-rule pt-12">
        <PhaseRef module={module} />
      </section>

      {/* ── Quellen ────────────────────────────────────────── */}
      {module.references.length > 0 && (
        <section className="mt-12 border-t border-rule pt-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Eyebrow>QUELLEN</Eyebrow>
              <ul className="mt-2 space-y-1">
                {module.references.map((ref) => (
                  <li key={ref} className="font-mono text-xs tracking-[0.12em] text-asphalt">
                    — {ref}
                  </li>
                ))}
              </ul>
            </div>
            {module.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {module.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-sm border border-rule px-2 py-0.5 font-mono text-[10px] tracking-[0.18em] uppercase text-concrete"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
