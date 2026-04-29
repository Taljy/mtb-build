interface PrintHeaderProps {
  title: string;
  subtitle: string | null;
  slug: string;
}

function today(): string {
  return new Date().toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export default function PrintHeader({ subtitle, slug }: PrintHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-rule pb-3 mb-6">
      {/* Left: wordmark */}
      <div className="flex items-center gap-2">
        <span
          style={{ fontFamily: "var(--font-display)", fontSize: "22pt", lineHeight: 1 }}
          className="text-pitch"
        >
          DREK
        </span>
        <span className="font-mono text-[9pt] tracking-[0.18em] uppercase text-asphalt">
          MTB-BUILD
        </span>
      </div>

      {/* Middle: slug/title info */}
      <div className="text-center">
        <p className="font-mono text-[9pt] tracking-[0.14em] uppercase text-asphalt">
          {slug}
        </p>
        {subtitle && (
          <p className="font-mono text-[8pt] tracking-[0.10em] uppercase text-concrete">
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: date */}
      <p className="font-mono text-[9pt] tracking-[0.14em] text-asphalt">
        {today()}
      </p>
    </header>
  );
}
