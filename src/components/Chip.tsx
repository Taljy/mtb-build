import { type ReactNode } from "react";

interface ChipProps {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export default function Chip({ children, active = false, onClick }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex items-center px-3 py-1.5 rounded-sm",
        "font-mono text-xs tracking-[0.18em] uppercase",
        "border transition-colors",
        active
          ? "border-ink text-ink bg-paper-deep"
          : "border-rule text-asphalt hover:text-ink hover:border-concrete",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
