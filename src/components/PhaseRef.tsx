import { Link } from "react-router-dom";
import type { Module } from "@/types";
import { loadModules, loadPlan } from "@/lib/loader";
import HairlineCard from "./HairlineCard";
import Eyebrow from "./Eyebrow";

interface PhaseRefProps {
  module: Module;
}

export default function PhaseRef({ module }: PhaseRefProps) {
  const plan = loadPlan();
  const phase = plan.find((p) => p.number === module.buildPhase);
  const phaseModules = loadModules().filter((m) => m.buildPhase === module.buildPhase);

  if (!phase) return null;

  return (
    <HairlineCard>
      <Eyebrow>BUILD-PHASEN-ZUORDNUNG</Eyebrow>
      <h2 className="display-s mt-2 text-pitch">
        PHASE {phase.number} · {phase.title}
      </h2>
      <p className="mt-2 text-sm text-asphalt">{phase.subtitle}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {phaseModules.map((m) => (
          <Link
            key={m.slug}
            to={`/module/${m.slug}`}
            className={[
              "rounded-sm border px-2 py-1 font-mono text-xs tracking-[0.18em] uppercase no-underline transition-colors",
              m.slug === module.slug
                ? "border-ink bg-paper-deep text-ink"
                : "border-rule text-asphalt hover:border-concrete hover:text-ink",
            ].join(" ")}
          >
            {m.number} {m.name}
          </Link>
        ))}
      </div>

      <div className="mt-4 border-t border-rule pt-4">
        <Link
          to="/plan"
          className="font-mono text-xs tracking-[0.18em] uppercase text-vermillion no-underline transition-colors hover:text-vermillion-deep"
        >
          → ZUM BUILD-PLAN
        </Link>
      </div>
    </HairlineCard>
  );
}
