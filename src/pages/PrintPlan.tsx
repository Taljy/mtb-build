import { useMemo } from "react";
import { loadPlan, loadModules } from "@/lib/loader";
import { formatChfRange } from "@/lib/format";
import PrintHeader from "@/components/print/PrintHeader";
import PrintFooter from "@/components/print/PrintFooter";
import PrintPhaseBlock from "@/components/print/PrintPhaseBlock";

export default function PrintPlan() {
  const plan = useMemo(() => loadPlan(), []);
  const allModules = useMemo(() => loadModules(), []);

  const last = plan[plan.length - 1];
  const totalWeeks = plan.reduce((s, p) => s + p.estimatedWeeks, 0);
  const totalModules = plan.reduce((s, p) => s + p.moduleSlugs.length, 0);

  const phaseModules = useMemo(
    () =>
      plan.map((phase) =>
        phase.moduleSlugs
          .map((slug) => allModules.find((m) => m.slug === slug))
          .filter((m): m is NonNullable<typeof m> => m !== undefined)
      ),
    [plan, allModules]
  );

  return (
    <div className="p-6 bg-white min-h-screen text-[10pt]">
      <PrintHeader
        title="BUILD-PLAN"
        subtitle={`${totalModules} MODULE · ${totalWeeks} WOCHEN`}
        slug="BUILD-PLAN · 5 PHASEN · DREK MTB-BUILD"
      />

      {/* Title block */}
      <div className="mb-6">
        <h1
          style={{ fontFamily: "var(--font-display)", fontSize: "24pt", lineHeight: 0.92 }}
          className="text-pitch uppercase"
        >
          BUILD-PLAN — {totalModules} MODULE — {totalWeeks} WOCHEN
        </h1>
        <p className="mt-2 font-serif italic text-asphalt text-[11pt] leading-snug">
          Von der Sandbox zur Vollanlage. In der Reihenfolge die Sinn macht.
        </p>
        <p className="mt-1 font-mono text-[9pt] tracking-[0.14em] uppercase text-asphalt">
          {formatChfRange(last.cumulativeBudgetChf.min, last.cumulativeBudgetChf.max)} ·{" "}
          {totalModules} MODULE · 5 PHASEN
        </p>
      </div>

      {/* 2-column phase grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {plan.map((phase, i) => (
          <PrintPhaseBlock key={phase.number} phase={phase} modules={phaseModules[i]} />
        ))}

        {/* 6th cell: sequence rationale (phases are odd — 5 phases in 2-col = 1 leftover) */}
        {plan.length % 2 !== 0 && (
          <div className="border border-rule p-3 flex flex-col justify-between">
            <div>
              <p className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt mb-2">
                WARUM DIESE REIHENFOLGE
              </p>
              <p className="text-[8pt] text-pitch leading-snug">
                Erstens Sandbox-Module — billig, modular, Werkstattprozesse einspielen.
                Zweitens Verbinder — Northshore und Roll-In verbinden die Objekte zu einer
                Anlage. Drittens Pumptrack als USP + erste Drops. Viertens Flow-Linie mit
                Tabletop, Anliegern, Step-Up. Erst zuletzt die teuren, statisch
                anspruchsvollen Advanced-Module.
              </p>
            </div>
            <p className="font-mono text-[7pt] tracking-[0.12em] uppercase text-asphalt mt-2 border-t border-rule pt-1">
              PHASE 5 KANN PAUSIERT WERDEN — PHASE 1–4 REICHEN FÜR EINE VOLLWERTIGE ANLAGE
            </p>
          </div>
        )}
      </div>

      <PrintFooter />
    </div>
  );
}
