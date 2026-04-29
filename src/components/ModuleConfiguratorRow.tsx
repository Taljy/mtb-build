import type { Module, SkillLevel, SkillVariant } from "@/types";
import { computeBom } from "@/lib/loader";
import { formatChf, skillLabel, categoryLabel } from "@/lib/format";
import HairlineCard from "@/components/HairlineCard";

interface ModuleConfiguratorRowProps {
  module: Module;
  selected: SkillLevel | null;
  onSelect: (level: SkillLevel | null) => void;
}

function getVariant(module: Module, level: SkillLevel): SkillVariant | undefined {
  return module.variants.find((v) => v.level === level);
}

export default function ModuleConfiguratorRow({
  module,
  selected,
  onSelect,
}: ModuleConfiguratorRowProps) {
  const activeVariant = selected ? getVariant(module, selected) : null;
  const total = activeVariant ? computeBom(activeVariant.bom).totalChf : null;

  return (
    <HairlineCard className="flex items-center gap-4 p-4">
      {/* Left: identity */}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <a
            href={`/module/${module.slug}`}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs tracking-[0.14em] text-concrete hover:text-vermillion transition-colors no-underline"
          >
            {module.number}
          </a>
          <span className="font-display text-lg text-pitch leading-none truncate">
            {module.name}
          </span>
        </div>
        <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] uppercase text-concrete">
          {categoryLabel(module.category)}
        </p>
      </div>

      {/* Middle: skill variant chips */}
      <div className="flex items-center gap-1 flex-wrap shrink-0">
        {/* "—" chip = deselect */}
        <button
          type="button"
          onClick={() => onSelect(null)}
          className={[
            "px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase border transition-colors",
            selected === null
              ? "border-vermillion bg-paper-deep text-vermillion"
              : "border-rule text-concrete hover:border-asphalt hover:text-ink",
          ].join(" ")}
        >
          —
        </button>

        {module.variants.map((v) => (
          <button
            key={v.level}
            type="button"
            onClick={() => onSelect(v.level)}
            className={[
              "px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase border transition-colors whitespace-nowrap",
              selected === v.level
                ? "border-vermillion bg-paper-deep text-vermillion"
                : "border-rule text-concrete hover:border-asphalt hover:text-ink",
            ].join(" ")}
          >
            {skillLabel(v.level)}
          </button>
        ))}
      </div>

      {/* Right: CHF total */}
      <div className="shrink-0 text-right min-w-[7rem]">
        {total !== null ? (
          <span className="font-display text-xl text-pitch leading-none">
            {formatChf(total)}
          </span>
        ) : (
          <span className="font-mono text-xs text-concrete">—</span>
        )}
      </div>
    </HairlineCard>
  );
}
