import type { BermCalculatorResult, BermCalculatorParams } from "@/types";

interface BermVisualizerProps {
  result: BermCalculatorResult;
  params: BermCalculatorParams;
}

const SVG_W = 320;
const SVG_H = 220;
const CX = 160;
const CY = 180;
const BASE_W = 220;

export default function BermVisualizer({ result, params }: BermVisualizerProps) {
  const { theoreticalAngle, practicalAngle, centripetalG } = result;

  const practRad = (practicalAngle * Math.PI) / 180;
  const theorRad = (theoreticalAngle * Math.PI) / 180;

  // Berm cross-section: trapezoid rising at practicalAngle
  // Inner wall starts at (CX - BASE_W/2, CY), outer wall at angle
  const wallH = 80; // px height of inner wall
  const wallW = wallH / Math.tan(practRad); // horizontal run

  const innerBase  = CX - BASE_W / 2;
  const outerBase  = CX + BASE_W / 2;
  const innerTop   = CY - wallH;
  const outerShift = wallW;

  // Trapezoid points (counter-clockwise from bottom-left)
  const trap = [
    [innerBase,              CY],
    [outerBase,              CY],
    [outerBase - outerShift, innerTop],
    [innerBase,              innerTop],
  ]
    .map(([x, y]) => `${x},${y}`)
    .join(" ");

  // Theoretical angle line (from outer-bottom, same rise)
  const theorW = wallH / Math.tan(theorRad);
  const theorX = outerBase - theorW;

  // Bike silhouette (simplified rectangle tilted at practicalAngle)
  const bikeW = 28;
  const bikeH = 12;
  const bikeCx = outerBase - outerShift / 2 - 4;
  const bikeCy = innerTop + (CY - innerTop) / 2;
  const bikeAngle = -practicalAngle;

  return (
    <div>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full border border-rule bg-paper-deep"
        aria-label="Anlieger-Querschnitt"
      >
        {/* Ground baseline */}
        <line
          x1={20} y1={CY}
          x2={SVG_W - 20} y2={CY}
          stroke="var(--color-concrete)" strokeWidth="1.5" strokeLinecap="butt"
        />

        {/* Berm trapezoid */}
        <polygon
          points={trap}
          fill="var(--color-paper)"
          stroke="var(--color-ink)"
          strokeWidth="1.5"
        />

        {/* Theoretical angle dashed line */}
        <line
          x1={outerBase} y1={CY}
          x2={theorX}    y2={innerTop}
          stroke="var(--color-asphalt)"
          strokeWidth="1.5"
          strokeDasharray="4,3"
          strokeLinecap="butt"
        />

        {/* Bike silhouette */}
        <rect
          x={bikeCx - bikeW / 2}
          y={bikeCy - bikeH / 2}
          width={bikeW}
          height={bikeH}
          fill="var(--color-dirt)"
          transform={`rotate(${bikeAngle}, ${bikeCx}, ${bikeCy})`}
        />

        {/* Practical angle arc + label */}
        <text
          x={outerBase - outerShift - 8}
          y={CY - 8}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fontWeight="600"
          fill="var(--color-ink)"
        >
          {practicalAngle}°
        </text>

        {/* Theoretical angle label */}
        <text
          x={theorX - 6}
          y={innerTop + 14}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="9"
          fill="var(--color-asphalt)"
        >
          {theoreticalAngle}° TH.
        </text>

        {/* Speed + radius annotation */}
        <text
          x={14} y={20}
          fontFamily="var(--font-mono)" fontSize="9"
          fill="var(--color-asphalt)"
        >
          R {params.radiusM} m · {params.speedKmh} km/h
        </text>
      </svg>

      <p className="mt-2 font-mono text-xs tracking-[0.14em] uppercase text-asphalt">
        BANKING THEORIE: {theoreticalAngle}°
        {" · "}BANKING PRAXIS: {practicalAngle}°
        {" · "}ZENTRIPETAL: {centripetalG.toFixed(2)} g
      </p>
    </div>
  );
}
