import type { PlanPhase, Module } from "@/types";
import { formatChfRange } from "@/lib/format";

interface PrintPhaseBlockProps {
  phase: PlanPhase;
  modules: Module[];
}

export default function PrintPhaseBlock({ phase, modules }: PrintPhaseBlockProps) {
  return (
    <div className="border border-rule p-3 h-full flex flex-col gap-2">
      {/* Phase number + title */}
      <div>
        <span
          style={{ fontFamily: "var(--font-display)", fontSize: "28pt", lineHeight: 1 }}
          className="text-concrete"
        >
          {String(phase.number).padStart(2, "0")}
        </span>
        <p
          style={{ fontFamily: "var(--font-display)", fontSize: "13pt", lineHeight: 1.1 }}
          className="text-pitch uppercase mt-0.5"
        >
          {phase.title}
        </p>
        <p className="font-mono text-[7pt] tracking-[0.10em] text-asphalt mt-0.5">
          {phase.subtitle}
        </p>
      </div>

      {/* Module list */}
      <div className="flex-1">
        {modules.map((m) => (
          <p key={m.slug} className="font-mono text-[8pt] text-pitch leading-snug">
            <span className="text-concrete">{m.number}</span> {m.name}
          </p>
        ))}
      </div>

      {/* Stats */}
      <p className="font-mono text-[7pt] tracking-[0.12em] uppercase text-asphalt mt-1 border-t border-rule pt-1">
        {phase.estimatedWeeks} WO · {phase.moduleSlugs.length} MOD ·{" "}
        {formatChfRange(phase.cumulativeBudgetChf.min, phase.cumulativeBudgetChf.max)}
      </p>
    </div>
  );
}
