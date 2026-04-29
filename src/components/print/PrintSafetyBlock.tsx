import type { SafetyInfo, SkillVariant } from "@/types";

interface PrintSafetyBlockProps {
  safety: SafetyInfo;
  safetyClearance: SkillVariant["safetyClearance"];
}

const ANTISLIP: Record<SafetyInfo["antiSlip"], string> = {
  saegerau:         "Sägerohe Oberfläche",
  streckmetall:     "Streckmetall",
  "epoxid-quarzsand": "Epoxid + Quarzsand",
  "antislip-coating": "Antislip-Coating",
  bitumen:          "Bitumen-Schicht",
};

export default function PrintSafetyBlock({ safety, safetyClearance }: PrintSafetyBlockProps) {
  return (
    <div className="print-avoid-break mt-3">
      <p className="font-mono text-[8pt] tracking-[0.18em] uppercase text-asphalt mb-1">
        SICHERHEIT
      </p>
      <table className="w-full border-collapse text-[8pt]">
        <tbody>
          {[
            [
              "STURZRAUM",
              `${safetyClearance.sides} m seitlich · ${safetyClearance.behind} m hinten`,
            ],
            [
              "BRÜSTUNG AB",
              safety.guardrailRequiredFrom !== null
                ? `${safety.guardrailRequiredFrom} cm`
                : "—",
            ],
            ["ANTIRUTSCH",   ANTISLIP[safety.antiSlip]],
            ["KANTENSCHUTZ", safety.edgeArmor ? "JA" : "—"],
          ].map(([label, value]) => (
            <tr key={label} className="border-b border-rule">
              <td className="font-mono text-[7pt] tracking-[0.14em] uppercase text-asphalt py-0.5 pr-3 whitespace-nowrap">
                {label}
              </td>
              <td className="font-mono text-[8pt] text-pitch py-0.5">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Flags — [!] instead of vermillion */}
      {(safety.staticProofRequired || safety.bypassRecommended) && (
        <div className="mt-2 flex flex-col gap-0.5">
          {safety.staticProofRequired && (
            <p className="font-mono text-[8pt] tracking-[0.14em] uppercase text-pitch font-bold">
              [!] STATIKNACHWEIS SIA 265 ERFORDERLICH
            </p>
          )}
          {safety.bypassRecommended && (
            <p className="font-mono text-[8pt] tracking-[0.14em] uppercase text-pitch">
              [→] BYPASS-LINIE EMPFOHLEN
            </p>
          )}
        </div>
      )}

      {/* Notes */}
      {(safety.staticProofReason || safetyClearance.notes || safety.edgeArmorNote) && (
        <div className="mt-1 space-y-0.5">
          {safety.staticProofReason && (
            <p className="text-[7pt] text-asphalt">{safety.staticProofReason}</p>
          )}
          {safetyClearance.notes && (
            <p className="text-[7pt] text-asphalt">{safetyClearance.notes}</p>
          )}
          {safety.edgeArmorNote && (
            <p className="text-[7pt] text-asphalt">{safety.edgeArmorNote}</p>
          )}
        </div>
      )}
    </div>
  );
}
