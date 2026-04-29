import { useMemo } from "react";
import { Link } from "react-router-dom";
import { loadModules } from "@/lib/loader";

export default function StaticProofMatrix() {
  const modules = useMemo(() => {
    const all = loadModules();
    return [
      ...all.filter((m) => m.safety.staticProofRequired),
      ...all.filter((m) => !m.safety.staticProofRequired),
    ];
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-rule text-sm">
        <thead>
          <tr className="border-b border-rule">
            {["MODUL", "PHASE", "STATIKNACHWEIS", "BEGRÜNDUNG"].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left font-mono text-[10px] tracking-[0.18em] text-concrete uppercase whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-rule">
          {modules.map((m) => (
            <tr key={m.slug}>
              <td className="px-3 py-2 whitespace-nowrap">
                <Link
                  to={`/module/${m.slug}`}
                  className="font-mono text-xs text-ink hover:text-vermillion transition-colors no-underline"
                >
                  {m.number} {m.name}
                </Link>
              </td>
              <td className="px-3 py-2 font-mono text-xs text-asphalt whitespace-nowrap">
                {m.buildPhase}
              </td>
              <td className="px-3 py-2 font-mono text-xs whitespace-nowrap">
                {m.safety.staticProofRequired ? (
                  <span className="text-vermillion">ERFORDERLICH</span>
                ) : (
                  <span className="text-concrete">—</span>
                )}
              </td>
              <td className="px-3 py-2 text-xs text-asphalt">
                {m.safety.staticProofReason ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
