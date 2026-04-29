import { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadPlan, loadModules } from "@/lib/loader";
import Eyebrow from "@/components/Eyebrow";
import BuildSequenceLine from "@/components/BuildSequenceLine";
import PhaseTimeline from "@/components/PhaseTimeline";
import PhaseDetail from "@/components/PhaseDetail";

export default function Plan() {
  const plan = useMemo(() => loadPlan(), []);
  const allModules = useMemo(() => loadModules(), []);

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
    <>
      {/* Hero */}
      <section className="border-b border-rule pb-8">
        <Eyebrow>AUFBAU-SEQUENZ · 5 PHASEN</Eyebrow>
        <h1>BUILD-PLAN</h1>
        <p className="mt-2 font-serif text-xl italic text-asphalt leading-relaxed max-w-[55ch]">
          Von der Sandbox zur Vollanlage. 31 Wochen netto, in der Reihenfolge
          die Sinn macht.
        </p>
        <BuildSequenceLine />
      </section>

      {/* Phase timeline overview */}
      <section className="mt-12">
        <PhaseTimeline phases={plan} />
      </section>

      {/* Phase details */}
      <section className="mt-12">
        <h2 className="display-s text-pitch mb-2">PHASEN IM DETAIL</h2>
        {plan.map((phase, i) => (
          <PhaseDetail key={phase.number} phase={phase} modules={phaseModules[i]} />
        ))}
      </section>

      {/* Why this sequence */}
      <section className="border-t border-rule mt-12 pt-12">
        <Eyebrow accent>WARUM DIESE REIHENFOLGE</Eyebrow>

        <div className="max-w-[65ch]">
          <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
            Erstens Skinnies, Wippe, Mini Kicker und Low Flat Box als Sandbox-Module —
            billig, modular, ideal um die Werkstattprozesse einzuspielen. Du lernst, wie
            Lärche sich verhält, wie lange die Verbindungen halten, welche Toleranzen der
            CNC wirklich braucht.
          </p>
          <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
            Zweitens Northshore und Roll-In als Verbinder — aus einzelnen Objekten wird
            eine befahrbare Anlage. Erst hier beginnt Flow entstehen.
          </p>
          <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
            Drittens Holz-Pumptrack als Marios USP: sichtbar, transportabel,
            marktwirtschaftlich differenzierend — plus die ersten echten Drops bis 60 cm.
            Wer Phase 3 hat, hat ein vermarktbares Produkt.
          </p>
          <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
            Viertens die Flow-Linie: Tabletop in drei Varianten, Anlieger, Step-Up, Long
            Jump. CNC-Spanten machen den Unterschied zur DIY-Konkurrenz hier am
            deutlichsten sichtbar.
          </p>
          <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-6">
            Erst zuletzt Wallride, 180°-Kehre und 100-cm-Drop — die teuren, statisch
            anspruchsvollen Module mit Pflicht-Statiknachweis. Für sie braucht es bewährte
            Werkstattprozesse, geklärten Baurechtsrahmen und den richtigen Versicherungsschutz.
          </p>

          <div className="border border-rule px-4 py-3 bg-paper-deep">
            <p className="font-mono text-xs tracking-[0.14em] text-asphalt uppercase">
              PHASE 5 KANN PAUSIERT WERDEN — PHASE 1–4 REICHEN FÜR EINE VOLLWERTIGE ANLAGE
            </p>
          </div>
        </div>
      </section>

      {/* Print CTA */}
      <section className="mt-12 pt-6 flex justify-end">
        <Link
          to="/print/plan"
          className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt hover:text-vermillion transition-colors no-underline"
        >
          → DRUCKVERSION FÜR WERKSTATT-WAND
        </Link>
      </section>
    </>
  );
}
