import { type ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  accent?: boolean;
}

export default function Eyebrow({ children, accent = false }: EyebrowProps) {
  return (
    <p
      className={[
        "font-mono text-xs tracking-[0.18em] uppercase mb-2",
        accent ? "text-vermillion" : "text-asphalt",
      ].join(" ")}
    >
      {children}
    </p>
  );
}
