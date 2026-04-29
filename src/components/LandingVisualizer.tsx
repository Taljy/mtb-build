import type { LandingCalculatorResult, LandingCalculatorParams } from "@/types";
import { computeJump } from "@/lib/geometry";

interface LandingVisualizerProps {
  result: LandingCalculatorResult;
  params: LandingCalculatorParams;
}

const SVG_W = 600;
const TRAJ_H = 160;
const EFH_H = 100;
const TOTAL_H = TRAJ_H + EFH_H + 20; // gap between panels
const X_MAX = 8;
const PAD_L = 40;
const PAD_R = 10;
const PLOT_W = SVG_W - PAD_L - PAD_R;

function toSvgX(x: number) {
  return PAD_L + (x / X_MAX) * PLOT_W;
}

export default function LandingVisualizer({ result, params }: LandingVisualizerProps) {
  const { efhProfile, maxEfh, isSafe } = result;
  const slopeRad = (params.landingSlopeDeg * Math.PI) / 180;
  const traj = computeJump({
    speedKmh: params.takeoffSpeedKmh,
    lipAngleDeg: params.takeoffAngleDeg,
    lipHeightCm: 0,
    wheelbaseCm: 117,
  });

  // ── Trajectory panel ──────────────────────────────────────
  const yMax = Math.max(traj.maxHeight + 0.5, 1.5);
  function ty(y: number) {
    return TRAJ_H - 20 - ((y + 0.2) / (yMax + 0.4)) * (TRAJ_H - 30);
  }
  const groundY = ty(0);

  const trajPoints = traj.trajectoryPoints
    .map((p) => `${toSvgX(p.x)},${ty(p.y)}`)
    .join(" ");

  // Landing slope line
  const x0 = 0;
  const x1 = X_MAX;
  const lsy0 = ty(-Math.tan(slopeRad) * x0 + params.heightOffsetM);
  const lsy1 = ty(-Math.tan(slopeRad) * x1 + params.heightOffsetM);

  // ── EFH panel (offset by TRAJ_H + gap) ───────────────────
  const EFH_TOP = TRAJ_H + 20;
  const efhPlotH = EFH_H - 20;
  const efhScale = Math.max(maxEfh, 1.5);

  function ey(efh: number) {
    return EFH_TOP + efhPlotH - (efh / efhScale) * efhPlotH;
  }
  const safeLineY = ey(1.2);

  return (
    <div>
      <svg
        viewBox={`0 0 ${SVG_W} ${TOTAL_H}`}
        className="w-full border border-rule bg-paper-deep"
        aria-label="EFH-Profil"
      >
        {/* ── Trajectory panel ── */}
        {/* Ground */}
        <line
          x1={PAD_L} y1={groundY} x2={SVG_W - PAD_R} y2={groundY}
          stroke="var(--color-concrete)" strokeWidth="1.5" strokeLinecap="butt"
        />
        {/* Landing slope */}
        <line
          x1={toSvgX(x0)} y1={lsy0}
          x2={toSvgX(x1)} y2={lsy1}
          stroke="var(--color-dirt)" strokeWidth="1.5" strokeDasharray="4,3"
          strokeLinecap="butt"
        />
        {/* Trajectory */}
        {traj.trajectoryPoints.length > 1 && (
          <polyline
            points={trajPoints}
            fill="none"
            stroke="var(--color-vermillion)"
            strokeWidth="2"
            strokeLinecap="butt"
          />
        )}
        {/* X-axis ticks (trajectory panel) */}
        {[0, 2, 4, 6, 8].map((x) => (
          <g key={x}>
            <line
              x1={toSvgX(x)} y1={groundY}
              x2={toSvgX(x)} y2={groundY + 4}
              stroke="var(--color-concrete)" strokeWidth="1"
            />
            <text
              x={toSvgX(x)} y={groundY + 13}
              textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="9"
              fill="var(--color-asphalt)"
            >
              {x}m
            </text>
          </g>
        ))}
        {/* Slope label */}
        <text
          x={toSvgX(X_MAX) - 4} y={lsy1 - 6}
          textAnchor="end"
          fontFamily="var(--font-mono)" fontSize="8"
          fill="var(--color-dirt)"
        >
          {params.landingSlopeDeg}° SLOPE
        </text>

        {/* ── EFH panel ── */}
        {/* Panel separator */}
        <line
          x1={PAD_L} y1={EFH_TOP - 6}
          x2={SVG_W - PAD_R} y2={EFH_TOP - 6}
          stroke="var(--color-rule-soft)" strokeWidth="1"
        />
        <text
          x={PAD_L} y={EFH_TOP + 10}
          fontFamily="var(--font-mono)" fontSize="8"
          fill="var(--color-asphalt)"
        >
          EFH (m)
        </text>
        {/* EFH bars */}
        {efhProfile.map(({ x, efh }) => {
          const barX = toSvgX(x);
          const barTop = ey(efh);
          const barBot = ey(0);
          const over = efh > 1.2;
          return (
            <rect
              key={x}
              x={barX - 3}
              y={barTop}
              width={6}
              height={Math.max(0, barBot - barTop)}
              fill={over ? "var(--color-vermillion)" : "var(--color-concrete)"}
              opacity={0.75}
            />
          );
        })}
        {/* 1.2m safety threshold */}
        <line
          x1={PAD_L} y1={safeLineY}
          x2={SVG_W - PAD_R} y2={safeLineY}
          stroke="var(--color-vermillion)"
          strokeWidth="1.5"
          strokeDasharray="5,3"
          strokeLinecap="butt"
        />
        <text
          x={SVG_W - PAD_R - 2} y={safeLineY - 4}
          textAnchor="end"
          fontFamily="var(--font-mono)" fontSize="8"
          fill="var(--color-vermillion)"
        >
          1.2m EFH
        </text>
      </svg>

      <p className="mt-2 font-mono text-xs tracking-[0.14em] uppercase text-asphalt">
        MAX EFH: {maxEfh.toFixed(2)} m
        {" · "}
        {isSafe
          ? <span className="text-ink">✓ SICHER</span>
          : <span className="text-vermillion">✗ GRENZWERT ÜBERSCHRITTEN</span>
        }
      </p>
    </div>
  );
}
