import { Link } from "react-router-dom";
import type { PlanPhase, Module } from "@/types";
import { formatChfRange } from "@/lib/format";
import Eyebrow from "@/components/Eyebrow";

interface PhaseDetailProps {
  phase: PlanPhase;
  modules: Module[];
}

export default function PhaseDetail({ phase, modules }: PhaseDetailProps) {
  return (
    <div id={`phase-${phase.number}`} className="border-t border-rule pt-10 mt-10 scroll-mt-24">
      {/* Phase header */}
      <div className="flex items-start gap-6 mb-6">
        <span className="font-display text-7xl text-concrete leading-none shrink-0">
          {String(phase.number).padStart(2, "0")}
        </span>
        <div>
          <Eyebrow>{phase.subtitle}</Eyebrow>
          <h3 className="display-s text-pitch">{phase.title}</h3>
          <p className="mt-3 font-serif text-lg italic text-asphalt leading-relaxed max-w-[60ch]">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Three-column grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mt-8">
        {/* MODULE column */}
        <div>
          <Eyebrow>MODULE</Eyebrow>
          <div className="flex flex-col gap-1">
            {modules.map((m) => (
              <Link
                key={m.slug}
                to={`/module/${m.slug}`}
                className="flex items-baseline gap-2 no-underline group"
              >
                <span className="font-mono text-[10px] tracking-[0.14em] text-concrete group-hover:text-vermillion transition-colors shrink-0">
                  {m.number}
                </span>
                <span className="font-display text-lg text-pitch group-hover:text-vermillion transition-colors leading-tight">
                  {m.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* SKILLS column */}
        <div>
          <Eyebrow>SKILL-COVERAGE</Eyebrow>
          <div className="flex flex-wrap gap-2">
            {phase.skillCoverage.map((skill) => (
              <span
                key={skill}
                className="font-mono text-[10px] tracking-[0.12em] uppercase border border-rule px-2 py-1 text-asphalt"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* BUDGET column */}
        <div>
          <Eyebrow>KUMULIERTES BUDGET</Eyebrow>
          <p className="font-display text-4xl text-pitch leading-none">
            {formatChfRange(
              phase.cumulativeBudgetChf.min,
              phase.cumulativeBudgetChf.max
            )}
          </p>
          <p className="font-mono text-[10px] tracking-[0.14em] text-concrete uppercase mt-2">
            BAUZEIT: ~{phase.estimatedWeeks} WOCHEN NETTO
          </p>
        </div>
      </div>
    </div>
  );
}
