import { Link } from "react-router-dom";
import type { Module } from "@/types";
import { getModulePriceRange } from "@/lib/loader";
import { formatChfRange, categoryLabel } from "@/lib/format";
import HairlineCard from "./HairlineCard";
import Eyebrow from "./Eyebrow";
import SkillBadge from "./SkillBadge";

interface ModuleCardProps {
  module: Module;
}

export default function ModuleCard({ module }: ModuleCardProps) {
  const range = getModulePriceRange(module);

  return (
    <Link to={`/module/${module.slug}`} className="group block no-underline">
      <HairlineCard className="flex h-full flex-col transition-transform duration-150 group-hover:-translate-y-px group-hover:border-ink">
        {/* Top row */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <Eyebrow>
            {module.number} · {categoryLabel(module.category).toUpperCase()}
          </Eyebrow>
          <div className="flex flex-wrap justify-end gap-1">
            {module.variants.map((v) => (
              <SkillBadge key={v.level} level={v.level} />
            ))}
          </div>
        </div>

        {/* Name */}
        <h3 className="display-s text-pitch">{module.name}</h3>

        {/* Tagline */}
        <p className="mt-2 mb-4 flex-1 text-sm leading-relaxed text-asphalt">
          {module.tagline}
        </p>

        {/* Stats footer */}
        <div className="flex items-center justify-between border-t border-rule pt-3 font-mono text-xs uppercase tracking-[0.18em]">
          <span className="text-ink">{formatChfRange(range.min, range.max)}</span>
          <span className="flex items-center gap-1 text-asphalt">
            <span className="text-vermillion">•</span>
            PHASE {module.buildPhase}
          </span>
          <span className="text-asphalt">PREFAB {module.prefab.workshopPercent}%</span>
        </div>
      </HairlineCard>
    </Link>
  );
}
