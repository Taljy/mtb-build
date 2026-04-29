import { Link } from "react-router-dom";
import Eyebrow from "@/components/Eyebrow";
import StatLine from "@/components/StatLine";
import HairlineCard from "@/components/HairlineCard";
import HeroSheet from "@/components/HeroSheet";
import SheetCarousel from "@/components/SheetCarousel";

const doors = [
  {
    num: "01 / 03",
    title: "MODULE",
    desc: "19 vorgeplante Bauelemente. Von der Rollwelle bis zum Doppelsprung — modular kombinierbar.",
    to: "/module",
  },
  {
    num: "02 / 03",
    title: "GEOMETRIE",
    desc: "Sprung, Landung, Anlieger. Alle Rechner für präzise Mass­angaben direkt im Gelände.",
    to: "/geometrie",
  },
  {
    num: "03 / 03",
    title: "BUILD-PLAN",
    desc: "Phasenplan, Budget, Timeline. Der gesamte Bauablauf auf einen Blick.",
    to: "/plan",
  },
];

const phases = [
  { label: "PHASE 0 · SETUP — DONE",          done: true },
  { label: "PHASE 1 · DESIGN-SYSTEM — IN ARBEIT", done: false, active: true },
  { label: "PHASE 2 · DATEN-SCHEMA — BEREIT",  done: false },
  { label: "PHASE 3 · MODULE-CONTENT",          done: false },
  { label: "PHASE 4 · RECHNER",                 done: false },
  { label: "PHASE 5 · BUILD-PLAN",              done: false },
];

const carouselSheets = [
  {
    src: "/sheets/kicker-brand.jpeg",
    alt: "DREK Brand-Sheet — BIG MTB KICKER mit Side View, Front View und Material-Übersicht",
    caption: "BRAND-SHEET · BIG MTB KICKER",
  },
  {
    src: "/sheets/kicker-seitenansicht.jpeg",
    alt: "MTB Kicker Seitenansicht — technische Zeichnung Maßstab 1:10",
    caption: "SEITENANSICHT · MASSSTAB 1:10",
  },
  {
    src: "/sheets/kicker-3d.jpeg",
    alt: "MTB Kicker 3D-Ansicht — isometrische Perspektive ohne Maßstab",
    caption: "3D-ANSICHT · OHNE MASSSTAB",
  },
  {
    src: "/sheets/kicker-grundriss.jpeg",
    alt: "MTB Kicker Grundriss — Draufsicht Maßstab 1:10",
    caption: "GRUNDRISS · MASSSTAB 1:10",
  },
];

const today = new Date().toLocaleDateString("de-CH", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export default function Home() {
  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────── */}
      <section className="py-24">
        <Eyebrow accent>DREK · FIELD MANUAL</Eyebrow>
        <h1 className="display-xl text-pitch">MTB-BUILD</h1>
        <p className="font-serif text-2xl italic text-asphalt mt-4 max-w-xl">
          Bikepark planen, bauen, befahren. Modular, ehrlich, im Hellen.
        </p>
        <div className="mt-8">
          <StatLine items={["19 MODULE", "3 SKILL-LEVELS", "80% PREFAB", "CHF 35K–55K"]} />
        </div>
      </section>

      {/* ── 2. Hero-Sheet — Material-Liste ───────────────────── */}
      <HeroSheet
        src="/sheets/kicker-material.jpeg"
        alt="MTB Kicker Material-Liste — vollständige Stückliste mit Holz-Struktur, Fahrsurface, Schrauben und Werkzeug"
        eyebrow="BEISPIEL-MODUL · MTB KICKER"
        subtitle="So sieht ein Modul-Datenblatt aus."
      />

      {/* ── 3. Drei Türen ────────────────────────────────────── */}
      <section className="py-16 border-t border-rule">
        <div className="grid grid-cols-1 gap-px md:grid-cols-3 border border-rule">
          {doors.map(({ num, title, desc, to }) => (
            <Link key={to} to={to} className="group no-underline">
              <HairlineCard className="flex flex-col justify-between h-full min-h-56 border-0 transition-colors group-hover:bg-paper">
                <div>
                  <p className="font-mono text-xs tracking-[0.18em] uppercase text-concrete mb-4">
                    {num}
                  </p>
                  <h3 className="display-m text-pitch mb-3">{title}</h3>
                  <p className="font-body text-sm text-asphalt leading-relaxed">{desc}</p>
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

      {/* ── 4. Sheet-Carousel — 4 Ansichten ─────────────────── */}
      <SheetCarousel sheets={carouselSheets} />

      {/* ── 5. Status-Block ──────────────────────────────────── */}
      <section className="py-16 border-t border-rule">
        <Eyebrow>BUILD-STATUS</Eyebrow>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:justify-between">
          {/* Phase list */}
          <div className="flex flex-col gap-2">
            {phases.map(({ label, done, active }) => (
              <span
                key={label}
                className={[
                  "font-mono text-xs tracking-[0.18em] uppercase",
                  done   ? "text-vermillion" :
                  active ? "text-ink" :
                           "text-concrete",
                ].join(" ")}
              >
                {label}
              </span>
            ))}
          </div>

          {/* Last update */}
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              LETZTES UPDATE
            </span>
            <span className="font-mono text-sm tracking-[0.18em] text-ink">
              {today}
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
