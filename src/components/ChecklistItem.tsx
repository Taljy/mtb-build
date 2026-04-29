interface ChecklistItemProps {
  required: boolean;
  label: string;
  detail: string | null;
}

export default function ChecklistItem({ required, label, detail }: ChecklistItemProps) {
  return (
    <div
      className={[
        "bg-paper-deep border border-rule p-4 border-l-4",
        required ? "border-l-vermillion" : "border-l-rule",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-lg text-pitch leading-snug">{label}</p>
          {detail && (
            <p className="mt-1 text-sm text-asphalt leading-relaxed">{detail}</p>
          )}
        </div>
        <span
          className={[
            "shrink-0 font-mono text-[10px] tracking-[0.18em] uppercase mt-0.5",
            required ? "text-vermillion" : "text-asphalt",
          ].join(" ")}
        >
          {required ? "PFLICHT" : "EMPFOHLEN"}
        </span>
      </div>
    </div>
  );
}
