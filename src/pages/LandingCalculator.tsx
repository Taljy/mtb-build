import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { LandingCalculatorParams } from "@/types";
import { computeLanding } from "@/lib/geometry";
import Eyebrow from "@/components/Eyebrow";
import DrekSlider from "@/components/DrekSlider";
import LandingVisualizer from "@/components/LandingVisualizer";
import WarningBanner from "@/components/WarningBanner";
import GeometrySubNav from "@/components/GeometrySubNav";

function initParams(sp: URLSearchParams): LandingCalculatorParams {
  return {
    jumpDistance:    Number(sp.get("dist"))  || 3,
    landingSlopeDeg: Number(sp.get("slope")) || 30,
    heightOffsetM:   Number(sp.get("hoff"))  || 0,
    takeoffSpeedKmh: Number(sp.get("speed")) || 22,
    takeoffAngleDeg: Number(sp.get("angle")) || 30,
  };
}

export default function LandingCalculator() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<LandingCalculatorParams>(() =>
    initParams(searchParams)
  );

  const result = computeLanding(params);

  const set = useCallback(
    (key: keyof LandingCalculatorParams) => (v: number) =>
      setParams((p) => ({ ...p, [key]: v })),
    []
  );

  function shareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("dist",  String(params.jumpDistance));
    url.searchParams.set("slope", String(params.landingSlopeDeg));
    url.searchParams.set("hoff",  String(params.heightOffsetM));
    url.searchParams.set("speed", String(params.takeoffSpeedKmh));
    url.searchParams.set("angle", String(params.takeoffAngleDeg));
    navigator.clipboard.writeText(url.toString()).catch(() => {});
  }

  return (
    <>
      <GeometrySubNav />

      {/* Hero */}
      <section className="border-b border-rule pb-8 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>RECHNER · LANDUNG</Eyebrow>
            <h1>LANDUNG</h1>
            <p className="mt-1 text-asphalt text-sm">
              EFH-Verifikation. Warnung bei Überschreitung der 1.2 m Sicherheitsschwelle.
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
        {/* Sliders */}
        <div className="flex flex-col gap-6">
          <DrekSlider
            label="TAKEOFF SPEED"
            value={params.takeoffSpeedKmh}
            min={5} max={35} step={1} unit="km/h"
            onChange={set("takeoffSpeedKmh")}
          />
          <DrekSlider
            label="TAKEOFF WINKEL"
            value={params.takeoffAngleDeg}
            min={15} max={55} step={1} unit="°"
            onChange={set("takeoffAngleDeg")}
          />
          <DrekSlider
            label="LANDUNGSNEIGUNG"
            value={params.landingSlopeDeg}
            min={0} max={45} step={1} unit="°"
            onChange={set("landingSlopeDeg")}
          />
          <DrekSlider
            label="HÖHENVERSATZ"
            value={params.heightOffsetM}
            min={-2} max={2} step={0.1} unit="m"
            onChange={set("heightOffsetM")}
          />

          {/* Eckdaten */}
          <div className="border border-rule divide-y divide-rule mt-2">
            {[
              ["MAX EFH",   `${result.maxEfh.toFixed(2)} m`],
              ["SICHER",    result.isSafe ? "JA ✓" : "NEIN ✗"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between px-3 py-2">
                <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
                  {label}
                </span>
                <span className={`font-display text-xl ${
                  label === "SICHER"
                    ? result.isSafe ? "text-ink" : "text-vermillion"
                    : result.maxEfh > 1.2 ? "text-vermillion" : "text-pitch"
                }`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Visualizer + warnings */}
        <div className="flex flex-col gap-4">
          <LandingVisualizer result={result} params={params} />
          <WarningBanner warnings={result.warnings} />
        </div>
      </div>
    </>
  );
}
