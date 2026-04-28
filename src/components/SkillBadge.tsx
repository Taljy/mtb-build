type Level = "anfaenger" | "mittel" | "fortgeschritten";

const config: Record<Level, { label: string; color: string }> = {
  anfaenger:      { label: "ANFÄNGER",  color: "text-asphalt" },
  mittel:         { label: "MITTEL",    color: "text-dirt" },
  fortgeschritten:{ label: "FORTG.",    color: "text-vermillion" },
};

interface SkillBadgeProps {
  level: Level;
}

export default function SkillBadge({ level }: SkillBadgeProps) {
  const { label, color } = config[level];
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5",
        "font-mono text-[10px] tracking-[0.18em] uppercase",
        "border border-current rounded-sm",
        color,
      ].join(" ")}
    >
      {label}
    </span>
  );
}
