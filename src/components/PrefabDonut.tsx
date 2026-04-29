import type { PrefabInfo } from "@/types";
import Eyebrow from "./Eyebrow";

interface PrefabDonutProps {
  prefab: PrefabInfo;
}

const R = 36;
const CX = 50;
const CY = 50;
const CIRCUMFERENCE = 2 * Math.PI * R;

export default function PrefabDonut({ prefab }: PrefabDonutProps) {
  const filled = (prefab.workshopPercent / 100) * CIRCUMFERENCE;

  return (
    <div>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        {/* Donut */}
        <div className="shrink-0">
          <svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            aria-label={`${prefab.workshopPercent}% in der Werkstatt vorgefertigt`}
          >
            {/* Background ring */}
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="var(--color-rule)"
              strokeWidth="10"
              strokeLinecap="butt"
            />
            {/* Workshop segment */}
            <circle
              cx={CX} cy={CY} r={R}
              fill="none"
              stroke="var(--color-vermillion)"
              strokeWidth="10"
              strokeLinecap="butt"
              strokeDasharray={`${filled} ${CIRCUMFERENCE - filled}`}
              transform={`rotate(-90, ${CX}, ${CY})`}
            />
            {/* Centre label */}
            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fontFamily="var(--font-display)"
              fontSize="18"
              fill="var(--color-pitch)"
              letterSpacing="0.04em"
            >
              {prefab.workshopPercent}%
            </text>
          </svg>
        </div>

        {/* Part lists */}
        <div className="flex flex-1 gap-8">
          <div className="min-w-0">
            <Eyebrow accent>WERKSTATT</Eyebrow>
            <ul className="mt-1 space-y-1">
              {prefab.workshopParts.map((p) => (
                <li key={p} className="text-xs leading-relaxed text-ink">
                  — {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">
            <Eyebrow>VOR ORT</Eyebrow>
            <ul className="mt-1 space-y-1">
              {prefab.onSiteParts.map((p) => (
                <li key={p} className="text-xs leading-relaxed text-ink">
                  — {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {prefab.cncAdvantage && (
        <div className="mt-4 border-t border-rule pt-4">
          <Eyebrow accent>CNC-VORTEIL</Eyebrow>
          <p className="mt-1 text-sm leading-relaxed text-ink">{prefab.cncNote}</p>
        </div>
      )}
    </div>
  );
}
