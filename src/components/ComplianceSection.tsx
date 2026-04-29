import { type ReactNode } from "react";
import Eyebrow from "@/components/Eyebrow";

interface ComplianceSectionProps {
  number: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ComplianceSection({
  number,
  title,
  subtitle,
  children,
}: ComplianceSectionProps) {
  return (
    <section className="border-t border-rule mt-12 pt-12">
      <div className="flex items-start gap-6 mb-6">
        <span className="font-display text-5xl text-concrete leading-none shrink-0">
          {number}
        </span>
        <div>
          <Eyebrow>{subtitle}</Eyebrow>
          <h2 className="display-s text-pitch">{title}</h2>
        </div>
      </div>
      <div className="max-w-[65ch]">{children}</div>
    </section>
  );
}
