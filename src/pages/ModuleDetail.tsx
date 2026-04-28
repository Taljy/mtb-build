import { useParams } from "react-router-dom";

export default function ModuleDetail() {
  const { slug } = useParams();
  return (
    <div>
      <p className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt mb-2">
        MODUL · {slug?.toUpperCase() ?? "—"}
      </p>
      <h1>MODUL-DETAIL</h1>
    </div>
  );
}
