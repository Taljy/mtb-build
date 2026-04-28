import { useParams } from "react-router-dom";

export default function PrintSheet() {
  const { slug } = useParams();
  return (
    <div className="p-8">
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt mb-2">
        DRUCK · {slug?.toUpperCase() ?? "—"}
      </p>
      <h1>DRUCKANSICHT</h1>
    </div>
  );
}
