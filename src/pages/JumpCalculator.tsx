import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { JumpCalculatorParams } from "@/types";
import { computeJump } from "@/lib/geometry";
import Eyebrow from "@/components/Eyebrow";
import DrekSlider from "@/components/DrekSlider";
import JumpVisualizer from "@/components/JumpVisualizer";
import WarningBanner from "@/components/WarningBanner";
import GeometrySubNav from "@/components/GeometrySubNav";

function initParams(sp: URLSearchParams): JumpCalculatorParams {
  return {
    speedKmh:    Number(sp.get("speed"))    || 22,
    lipAngleDeg: Number(sp.get("angle"))    || 30,
    lipHeightCm: Number(sp.get("height"))   || 90,
    wheelbaseCm: Number(sp.get("wb"))       || 117,
  };
}

export default function JumpCalculator() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState<JumpCalculatorParams>(() =>
    initParams(searchParams)
  );

  const result = computeJump(params);

  const set = useCallback(
    (key: keyof JumpCalculatorParams) => (v: number) =>
      setParams((p) => ({ ...p, [key]: v })),
    []
  );

  function shareLink() {
    const url = new URL(window.location.href);
    url.searchParams.set("speed",  String(params.speedKmh));
    url.searchParams.set("angle",  String(params.lipAngleDeg));
    url.searchParams.set("height", String(params.lipHeightCm));
    url.searchParams.set("wb",     String(params.wheelbaseCm));
    navigator.clipboard.writeText(url.toString()).catch(() => {});
  }

  return (
    <>
      <GeometrySubNav />

      {/* Hero */}
      <section className="border-b border-rule pb-8 mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Eyebrow>RECHNER · SPRUNG</Eyebrow>
            <h1>SPRUNG</h1>
            <p className="mt-1 text-asphalt text-sm">
              Parabel-Flugbahn aus Anfahrtsspeed und Lippenwinkel.
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
            label="ANFAHRTSSPEED"
            value={params.speedKmh}
            min={5} max={35} step={1} unit="km/h"
            onChange={set("speedKmh")}
          />
          <DrekSlider
            label="LIPPENWINKEL"
            value={params.lipAngleDeg}
            min={15} max={55} step={1} unit="°"
            onChange={set("lipAngleDeg")}
          />
          <DrekSlider
            label="LIPPENHÖHE"
            value={params.lipHeightCm}
            min={30} max={150} step={5} unit="cm"
            onChange={set("lipHeightCm")}
          />
          <DrekSlider
            label="RADSTAND"
            value={params.wheelbaseCm}
            min={100} max={130} step={1} unit="cm"
            onChange={set("wheelbaseCm")}
          />

          {/* Eckdaten table */}
          <div className="border border-rule divide-y divide-rule mt-2">
            {[
              ["REICHWEITE",  `${result.range.toFixed(2)} m`],
              ["MAX HÖHE",    `${result.maxHeight.toFixed(2)} m`],
              ["FLUGZEIT",    `${result.flightTime.toFixed(2)} s`],
              ["V AM LIP",    `${result.exitSpeedMs.toFixed(1)} m/s`],
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
          <JumpVisualizer result={result} lipHeightCm={params.lipHeightCm} />
          <WarningBanner warnings={result.warnings} />
        </div>
      </div>
    </>
  );
}
