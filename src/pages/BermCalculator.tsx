import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { BermCalculatorParams } from "@/types";
import { computeBerm } from "@/lib/geometry";
import Eyebrow from "@/components/Eyebrow";
import DrekSlider from "@/components/DrekSlider";
import BermVisualizer from "@/components/BermVisualizer";
import WarningBanner from "@/components/WarningBanner";
import GeometrySubNav from "@/components/GeometrySubNav";

function initParams(sp: URLSearchParams): BermCalculatorParams {
  return {
    radiusM:            Number(sp.get("radius")) || 3,
    speedKmh:           Number(sp.get("speed"))  || 22,
    practiceCorrection: sp.get("corr") !== "0",
  };
}

export default function BermCalculator() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<BermCalculatorParams>(() =>
    initParams(searchParams)
  );

  const result = computeBerm(params);

  const set = useCallback(
    (key: keyof BermCalculatorParams) => (v: number) =>
      setParams((p) => ({ ...p, [key]: v })),
    []
  );

  function shareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("radius", String(params.radiusM));
    url.searchParams.set("speed",  String(params.speedKmh));
    url.searchParams.set("corr",   params.practiceCorrection ? "1" : "0");
    navigator.clipboard.writeText(url.toString()).catch(() => {});
  }

  return (
    <>
      <GeometrySubNav />

      {/* Hero */}
      <section className="border-b border-rule pb-8 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>RECHNER · ANLIEGER</Eyebrow>
            <h1>ANLIEGER</h1>
            <p className="mt-1 text-asphalt text-sm">
              Banking-Winkel aus Radius und Geschwindigkeit. Theoretisch + Praxis-Korrektur.
            </p>
          </div>
          <button
            type="button"
            onClick={shareLink}
            className="shrink-0 font-mono text-xs tracking-[0.18em] uppercase text-vermillion hover:text-vermillion-deep transition-colors"
          >
            → SHARE LINK
          </button>
        </div>
      </section>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Sliders + controls */}
        <div className="flex flex-col gap-6">
          <DrekSlider
            label="RADIUS"
            value={params.radiusM}
            min={1} max={10} step={0.5} unit="m"
            onChange={set("radiusM")}
          />
          <DrekSlider
            label="ANFAHRTSSPEED"
            value={params.speedKmh}
            min={10} max={35} step={1} unit="km/h"
            onChange={set("speedKmh")}
          />

          {/* Practice correction toggle */}
          <div className="flex items-center justify-between border border-rule px-3 py-2">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              PRAXIS-KORREKTUR
            </span>
            <button
              type="button"
              onClick={() =>
                setParams((p) => ({ ...p, practiceCorrection: !p.practiceCorrection }))
              }
              className={[
                "font-mono text-xs tracking-[0.18em] uppercase transition-colors",
                params.practiceCorrection
                  ? "text-vermillion"
                  : "text-concrete hover:text-ink",
              ].join(" ")}
            >
              {params.practiceCorrection ? "AN ✓" : "AUS"}
            </button>
          </div>

          {/* Eckdaten */}
          <div className="border border-rule divide-y divide-rule mt-2">
            {[
              ["THEORIE",     `${result.theoreticalAngle}°`],
              ["PRAXIS",      `${result.practicalAngle}°`],
              ["ZENTRIPETAL", `${result.centripetalG.toFixed(2)} g`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between px-3 py-2">
                <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
                  {label}
                </span>
                <span className="font-display text-xl text-pitch">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Visualizer + warnings */}
        <div className="flex flex-col gap-4">
          <BermVisualizer result={result} params={params} />
          <WarningBanner warnings={result.warnings} />
        </div>
      </div>
    </>
  );
}
