import type { PlanPhase } from "@/types";
import { formatChfRange } from "@/lib/format";

interface PhaseTimelineProps {
  phases: PlanPhase[];
}

export default function PhaseTimeline({ phases }: PhaseTimelineProps) {
  return (
    <div className="relative">
      {/* Desktop: 5-column grid with SVG connector line */}
      <div className="hidden md:block">
        {/* Connector line behind the cards */}
        <svg
          className="absolute top-[4.5rem] left-0 w-full"
          height="2"
          preserveAspectRatio="none"
          aria-hidden
        >
          <line
            x1="10%"
            y1="1"
            x2="90%"
            y2="1"
            stroke="var(--color-vermillion)"
            strokeWidth="1.5"
          />
        </svg>

        <div className="grid grid-cols-5 gap-px border border-rule">
          {phases.map((p) => (
            <a
              key={p.number}
              href={`#phase-${p.number}`}
              className="no-underline group bg-paper-deep border-0 p-5 flex flex-col gap-3 hover:bg-paper transition-colors"
            >
              <span className="font-display text-6xl text-concrete leading-none group-hover:text-asphalt transition-colors">
                {String(p.number).padStart(2, "0")}
              </span>
              <div>
                <p className="font-display text-2xl text-pitch leading-tight">
                  {p.title}
                </p>
                <p className="text-xs text-asphalt mt-1">{p.subtitle}</p>
              </div>
              <div className="flex flex-col gap-0.5 mt-auto">
                <p className="font-mono text-[10px] tracking-[0.12em] text-concrete uppercase">
                  {p.estimatedWeeks} WO · {p.moduleSlugs.length} MOD.
                </p>
                <p className="font-mono text-[10px] tracking-[0.12em] text-concrete uppercase">
                  {formatChfRange(p.cumulativeBudgetChf.min, p.cumulativeBudgetChf.max)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Mobile: vertical stack */}
      <div className="flex flex-col divide-y divide-rule border border-rule md:hidden">
        {phases.map((p) => (
          <a
            key={p.number}
            href={`#phase-${p.number}`}
            className="no-underline flex items-start gap-4 p-4 hover:bg-paper-deep transition-colors"
          >
            <span className="font-display text-5xl text-concrete leading-none shrink-0">
              {String(p.number).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <p className="font-display text-xl text-pitch leading-tight">{p.title}</p>
              <p className="text-xs text-asphalt mt-0.5">{p.subtitle}</p>
              <p className="font-mono text-[10px] tracking-[0.12em] text-concrete uppercase mt-2">
                {p.estimatedWeeks} Wochen · {p.moduleSlugs.length} Module ·{" "}
                {formatChfRange(p.cumulativeBudgetChf.min, p.cumulativeBudgetChf.max)}
              </p>
            </div>
            <span className="font-mono text-vermillion ml-auto shrink-0">→</span>
          </a>
        ))}
      </div>
    </div>
  );
}
