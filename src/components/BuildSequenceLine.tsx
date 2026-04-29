import { loadPlan } from "@/lib/loader";
import { formatChfRange } from "@/lib/format";

export default function BuildSequenceLine() {
  const phases = loadPlan();
  const last = phases[phases.length - 1];
  const totalWeeks = phases.reduce((s, p) => s + p.estimatedWeeks, 0);
  const totalModules = phases.reduce((s, p) => s + p.moduleSlugs.length, 0);

  function scrollTo(phaseNum: number) {
    const el = document.getElementById(`phase-${phaseNum}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex items-center justify-between gap-4 border-b border-rule py-4 mt-6 flex-wrap">
      {/* Phase chips */}
      <div className="flex items-center gap-1 flex-wrap">
        {phases.map((p, i) => (
          <div key={p.number} className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => scrollTo(p.number)}
              className="font-mono text-[10px] tracking-[0.18em] uppercase border border-rule px-2 py-1 text-asphalt hover:border-vermillion hover:text-vermillion transition-colors whitespace-nowrap"
            >
              PHASE {p.number}
            </button>
            {i < phases.length - 1 && (
              <span className="font-mono text-[10px] text-concrete">→</span>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="font-mono text-[10px] tracking-[0.14em] uppercase text-concrete whitespace-nowrap">
        {totalModules} MODULE · {totalWeeks} WOCHEN ·{" "}
        {formatChfRange(last.cumulativeBudgetChf.min, last.cumulativeBudgetChf.max)}
      </div>
    </div>
  );
}
