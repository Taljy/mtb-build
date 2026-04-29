import type { SafetyInfo, SkillVariant } from "@/types";
import Eyebrow from "./Eyebrow";

interface SafetyBlockProps {
  safety: SafetyInfo;
  safetyClearance: SkillVariant["safetyClearance"];
}

const ANTISLIP: Record<SafetyInfo["antiSlip"], string> = {
  "saegerau":          "Sägerohe Oberfläche",
  "streckmetall":      "Streckmetall",
  "epoxid-quarzsand":  "Epoxid + Quarzsand",
  "antislip-coating":  "Antislip-Coating",
  "bitumen":           "Bitumen-Schicht",
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2">
      <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
        {label}
      </span>
      <span className="font-mono text-sm text-ink">{value}</span>
    </div>
  );
}

export default function SafetyBlock({ safety, safetyClearance }: SafetyBlockProps) {
  return (
    <div>
      <Eyebrow>SICHERHEIT</Eyebrow>
      <div className="border border-rule divide-y divide-rule">
        <Row
          label="STURZRAUM"
          value={`${safetyClearance.sides} m seitlich · ${safetyClearance.behind} m hinten`}
        />
        <Row
          label="BRÜSTUNG AB"
          value={
            safety.guardrailRequiredFrom !== null
              ? `${safety.guardrailRequiredFrom} cm`
              : "NICHT NÖTIG"
          }
        />
        <Row label="ANTIRUTSCH"   value={ANTISLIP[safety.antiSlip]} />
        <Row label="KANTENSCHUTZ" value={safety.edgeArmor ? "JA" : "NEIN"} />
      </div>

      {(safety.staticProofRequired || safety.bypassRecommended) && (
        <div className="mt-3 flex flex-col gap-1.5">
          {safety.staticProofRequired && (
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-vermillion">
              ▲ STATIKNACHWEIS ERFORDERLICH
            </p>
          )}
          {safety.bypassRecommended && (
            <p className="font-mono text-xs tracking-[0.18em] uppercase text-vermillion">
              → BYPASS-LINIE EMPFOHLEN
            </p>
          )}
        </div>
      )}

      {(safety.staticProofReason || safetyClearance.notes || safety.edgeArmorNote) && (
        <div className="mt-3 space-y-1">
          {safety.staticProofReason && (
            <p className="text-xs leading-relaxed text-asphalt">{safety.staticProofReason}</p>
          )}
          {safetyClearance.notes && (
            <p className="text-xs leading-relaxed text-asphalt">{safetyClearance.notes}</p>
          )}
          {safety.edgeArmorNote && (
            <p className="text-xs leading-relaxed text-asphalt">{safety.edgeArmorNote}</p>
          )}
        </div>
      )}
    </div>
  );
}
