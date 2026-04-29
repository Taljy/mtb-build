import type { JumpCalculatorResult } from "@/types";

interface JumpVisualizerProps {
  result: JumpCalculatorResult;
  lipHeightCm: number;
}

const PAD = 0.8; // m padding around content
const SVG_W = 600;
const SVG_H = 260;

export default function JumpVisualizer({ result, lipHeightCm }: JumpVisualizerProps) {
  const { trajectoryPoints, range, maxHeight } = result;
  const lipH = lipHeightCm / 100;

  const xMax = Math.max(range + PAD, 2);
  const yMax = Math.max(maxHeight + PAD, lipH + PAD, 1.5);

  // world → SVG coordinate transform
  function sx(x: number) {
    return (x / xMax) * (SVG_W - 60) + 40;
  }
  function sy(y: number) {
    return SVG_H - 30 - ((y + lipH) / (yMax + lipH)) * (SVG_H - 50);
  }

  const groundY = sy(0);
  const originX = sx(0);

  // Trajectory polyline
  const points = trajectoryPoints
    .map((p) => `${sx(p.x)},${sy(p.y + lipH)}`)
    .join(" ");

  // Axis tick marks
  const xTicks: number[] = [];
  for (let x = 0; x <= Math.ceil(xMax); x++) xTicks.push(x);
  const yTicks: number[] = [];
  for (let y = 0; y <= Math.ceil(yMax + lipH); y++) yTicks.push(y);

  return (
    <div>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full border border-rule bg-paper-deep"
        aria-label="Sprung-Trajektorie"
      >
        {/* Ground line */}
        <line
          x1={originX - 20}
          y1={groundY}
          x2={SVG_W - 10}
          y2={groundY}
          stroke="var(--color-concrete)"
          strokeWidth="1.5"
          strokeLinecap="butt"
        />

        {/* X-axis ticks */}
        {xTicks.map((x) => (
          <g key={x}>
            <line
              x1={sx(x)} y1={groundY}
              x2={sx(x)} y2={groundY + 4}
              stroke="var(--color-concrete)"
              strokeWidth="1"
            />
            <text
              x={sx(x)} y={groundY + 13}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--color-asphalt)"
            >
              {x}m
            </text>
          </g>
        ))}

        {/* Y-axis ticks */}
        {yTicks.map((y) => (
          <g key={y}>
            <line
              x1={originX - 4} y1={sy(y - lipH)}
              x2={originX}     y2={sy(y - lipH)}
              stroke="var(--color-concrete)"
              strokeWidth="1"
            />
            <text
              x={originX - 7} y={sy(y - lipH) + 3}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize="9"
              fill="var(--color-asphalt)"
            >
              {y}m
            </text>
          </g>
        ))}

        {/* Lip triangle */}
        <polygon
          points={`${originX - 14},${groundY} ${originX},${groundY} ${originX},${sy(lipH)}`}
          fill="var(--color-concrete)"
          stroke="var(--color-rule)"
          strokeWidth="1"
        />

        {/* Knuckle marker (landing sweet-spot) */}
        {range > 0 && (
          <g>
            <line
              x1={sx(range)} y1={groundY - 10}
              x2={sx(range)} y2={groundY + 6}
              stroke="var(--color-vermillion)"
              strokeWidth="1.5"
              strokeDasharray="3,2"
              strokeLinecap="butt"
            />
            <text
              x={sx(range)} y={groundY + 17}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="8"
              fill="var(--color-vermillion)"
            >
              KNUCKLE
            </text>
          </g>
        )}

        {/* Trajectory */}
        {trajectoryPoints.length > 1 && (
          <polyline
            points={points}
            fill="none"
            stroke="var(--color-vermillion)"
            strokeWidth="2"
            strokeLinecap="butt"
            strokeLinejoin="miter"
          />
        )}
      </svg>

      {/* Stats line */}
      <p className="mt-2 font-mono text-xs tracking-[0.14em] uppercase text-asphalt">
        REICHWEITE: {result.range.toFixed(1)} m
        {" · "}MAX HÖHE: {result.maxHeight.toFixed(2)} m
        {" · "}FLUGZEIT: {result.flightTime.toFixed(2)} s
        {" · "}V-LIP: {result.exitSpeedMs.toFixed(1)} m/s
      </p>
    </div>
  );
}
