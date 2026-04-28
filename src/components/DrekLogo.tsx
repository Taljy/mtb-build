interface DrekLogoProps {
  height?: number;
  color?: string;
}

export default function DrekLogo({ height = 28, color = "currentColor" }: DrekLogoProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-display)",
        fontSize: `${Math.round(height * 1.35)}px`,
        lineHeight: 1,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        color,
        display: "inline-block",
      }}
    >
      DREK
    </span>
  );
}
