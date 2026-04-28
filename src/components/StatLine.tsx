interface StatLineProps {
  items: string[];
}

export default function StatLine({ items }: StatLineProps) {
  return (
    <p className="font-mono text-sm tracking-[0.18em] uppercase text-asphalt leading-relaxed">
      {items.join(" · ")}
    </p>
  );
}
