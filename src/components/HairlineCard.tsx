import { type ReactNode } from "react";

interface HairlineCardProps {
  children: ReactNode;
  className?: string;
}

export default function HairlineCard({ children, className = "" }: HairlineCardProps) {
  return (
    <div
      className={[
        "bg-paper-deep border border-rule p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
