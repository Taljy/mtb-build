import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";
import HairlineCard from "@/components/HairlineCard";
import GeometrySubNav from "@/components/GeometrySubNav";

const calculators = [
  {
    to: "/geometrie/sprung",
    num: "01",
    title: "SPRUNG",
    desc: "Reichweite und Flughöhe aus Anfahrtsspeed und Lippenwinkel. Parabolische Trajektorie mit Energie-Erhalt.",
  },
  {
    to: "/geometrie/landung",
    num: "02",
    title: "LANDUNG",
    desc: "EFH-Verifikation (Equivalent Fall Height). Warnung bei Überschreitung der 1.2 m Sicherheitsschwelle.",
  },
  {
    to: "/geometrie/anlieger",
    num: "03",
    title: "ANLIEGER",
    desc: "Banking-Winkel aus Radius und Geschwindigkeit. Theoretischer Wert mit Praxis-Korrektur.",
  },
];

export default function GeometryHub() {
  return (
    <>
      <GeometrySubNav />

      {/* Hero */}
      <section className="border-b border-rule pb-12">
        <Eyebrow>WERKZEUGE · 3 RECHNER</Eyebrow>
        <h1>GEOMETRIE</h1>
        <p className="mt-2 text-asphalt">
          Sprung, Landung, Anlieger. Drag-Slider, Live-SVG.
        </p>
      </section>

      {/* Calculator cards */}
      <section className="mt-8">
        <div className="grid grid-cols-1 gap-px border border-rule md:grid-cols-3">
          {calculators.map(({ to, num, title, desc }) => (
            <Link key={to} to={to} className="group no-underline">
              <HairlineCard className="flex h-full min-h-48 flex-col justify-between border-0 transition-colors group-hover:bg-paper">
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] uppercase text-concrete mb-4">
                    {num} / 03
                  </p>
                  <h3 className="display-m text-pitch mb-3">{title}</h3>
                  <p className="text-sm leading-relaxed text-asphalt">{desc}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <span className="font-mono text-lg text-vermillion transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </HairlineCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Theory block */}
      <section className="mt-12 border-t border-rule pt-12">
        <h2 className="display-m text-pitch mb-8">GRUNDLAGEN</h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Eyebrow>KLOTHOIDE</Eyebrow>
            <p className="font-serif text-lg italic text-asphalt leading-relaxed mt-2">
              Eine Klothoide ist eine Spirale mit stetig zunehmender Krümmung —
              der bevorzugte Take-off-Verlauf bei Sprüngen. Im Gegensatz zum
              Kreisbogen wird das Bike sanft auf den Lippenwinkel umgelenkt,
              ohne Bucking.
            </p>
          </div>
          <div>
            <Eyebrow>EFH — EQUIVALENT FALL HEIGHT</Eyebrow>
            <p className="font-serif text-lg italic text-asphalt leading-relaxed mt-2">
              Equivalent Fall Height misst die senkrecht zur Landung wirkende
              Aufprall-Energie. Schweizer Skiindustrie-Standard: EFH ≤ 1.2 m
              über die gesamte Landefläche. Eine flache Tafel ist deshalb
              gefährlicher als eine steilere Landung — sie zwingt den Fahrer
              in eine senkrechte Aufprallkomponente.
            </p>
          </div>
          <div>
            <Eyebrow>BANKING-FORMEL</Eyebrow>
            <p className="font-serif text-lg italic text-asphalt leading-relaxed mt-2">
              Der theoretische Bankingwinkel folgt aus Radius und
              Geschwindigkeit: α = arctan(v² / g·r). In der Praxis werden
              Anlieger 5–10° flacher gebaut, weil Reibung das System stützt —
              eine Klothoid-Einleitung von 2.5–3 m vor und nach dem Apex macht
              die Linie sauber befahrbar.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-rule pt-6">
          <Eyebrow>QUELLEN</Eyebrow>
          <ul className="mt-2 space-y-1">
            {[
              "Trailism — Dirt Jump Geometry Fundamentals",
              "Lee McCormack — Pump Track Nation",
              "Hubbard & McNeil — Sports Engineering 2015",
              "IMBA Trail Building Guidelines",
              "Velosolutions Pump Track Standards",
            ].map((s) => (
              <li key={s} className="font-mono text-xs tracking-[0.12em] text-asphalt">
                — {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
