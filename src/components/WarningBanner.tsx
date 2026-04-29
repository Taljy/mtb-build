import Eyebrow from "./Eyebrow";

interface WarningBannerProps {
  warnings: string[];
}

export default function WarningBanner({ warnings }: WarningBannerProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="border-2 border-vermillion bg-paper-deep p-4">
      <Eyebrow accent>WARNUNGEN · {warnings.length}</Eyebrow>
      <ul className="mt-1 space-y-1">
        {warnings.map((w) => (
          <li
            key={w}
            className="font-mono text-xs tracking-[0.14em] text-vermillion"
          >
            ▲ {w}
          </li>
        ))}
      </ul>
    </div>
  );
}
