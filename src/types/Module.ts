/**
 * Modul-Typen für mtb-build
 *
 * Ein Modul ist ein einzelnes Bikepark-Element (Skinny, Wippe, Drop, ...).
 * Pro Modul gibt es bis zu 3 Skill-Varianten (Anfänger / Mittel / Fortgeschritten).
 * Die Daten stammen aus dem Research-Report "Holz-MTB-Bikepark Baden".
 *
 * Konvention: Leere Felder werden in JSON als `null` ausgedrückt,
 * im TypeScript als `T | null` getypt — JSON kennt kein `undefined`.
 */

import type { Geometry } from "./Geometry";
import type { BillOfMaterials } from "./BillOfMaterials";

// ────────────────────────────────────────────────────────────────────
// Enums / Literal Types
// ────────────────────────────────────────────────────────────────────

export type ModuleCategory =
  | "balance"      // Skinnies, Wood Path
  | "anlieger"     // 90°/180°-Berms, Wood Berm, Übergangs-Anlieger
  | "sprung"       // Mini Kicker, Tabletop, Step-Up, Long Jump, Super Combo
  | "drop"         // Drops 30/60/100
  | "northshore"   // Brücken gerade/Kurve
  | "pumptrack"    // Roller, Pumptrack-Berm
  | "transition"   // Roll-In, Wallride, Wippe, Low Flat Box
  ;

export type SkillLevel = "anfaenger" | "mittel" | "fortgeschritten";

export type FoundationType =
  | "krinner"        // Schraubfundament, reversibel
  | "punktfundament" // Beton C25/30 mit H-Anker
  | "erdspiess"      // lose mit Erdspiess
  | "splittbett"     // Pumptrack-Module auf Splittbett
  | "lose"           // Eigengewicht, kein Fundament nötig
  ;

// ────────────────────────────────────────────────────────────────────
// Skill-Variante — pro Modul 1–3 davon
// ────────────────────────────────────────────────────────────────────

export interface SkillVariant {
  level: SkillLevel;

  // Hauptmasse (alle in cm, Geld in CHF)
  dimensions: {
    length: number | null;       // Länge in cm
    width: number | null;        // Breite in cm
    height: number | null;       // Höhe in cm
    radius: number | null;       // bei Anliegern: Radius in cm
    angle: number | null;        // bei Sprüngen: Lippenwinkel in Grad
                                 // bei Anliegern: Bankwinkel in Grad
  };

  // Modul-spezifische Geometrie (bei Sprüngen/Anliegern relevant)
  // Bei Skinny/Wippe/Low Flat Box optional → null
  geometry: Geometry | null;

  // Empfohlene Anfahrtsgeschwindigkeit (km/h)
  recommendedSpeed: { min: number; max: number } | null;

  // Stückliste — nur Mengen + Material-Slugs, Preise via material.json
  bom: BillOfMaterials;

  // Sturzraum-Anforderungen
  safetyClearance: {
    sides: number;         // m seitlich frei
    behind: number;        // m hinter Element frei
    notes: string | null;  // z.B. "Bypass-Linie zwingend"
  };

  // Kurzer Beschrieb der Charakteristik
  characterNote: string | null;
}

// ────────────────────────────────────────────────────────────────────
// Vorfertigung
// ────────────────────────────────────────────────────────────────────

export interface PrefabInfo {
  // Prozent in der Schreinerei vorfertigbar (0–100)
  workshopPercent: number;

  // Was wird in der Werkstatt gemacht?
  workshopParts: string[];

  // Was muss vor Ort?
  onSiteParts: string[];

  // CNC-Vorteil? (relevant für Marios Schreinerei-USP)
  cncAdvantage: boolean;
  cncNote: string | null;
}

// ────────────────────────────────────────────────────────────────────
// Sicherheits- und Compliance-Hinweise pro Modul
// ────────────────────────────────────────────────────────────────────

export interface SafetyInfo {
  // EN 14974 Brüstungs-Pflicht ab welcher Höhe (cm)?
  // null = nie nötig für dieses Modul
  guardrailRequiredFrom: number | null;

  // Kantenschutz nötig? (Stahlwinkel an Lippe etc.)
  edgeArmor: boolean;
  edgeArmorNote: string | null;

  // Antirutsch-Empfehlung
  antiSlip:
    | "saegerau"
    | "streckmetall"
    | "epoxid-quarzsand"
    | "antislip-coating"
    | "bitumen";

  // Statiknachweis durch Bauingenieur SIA empfohlen?
  staticProofRequired: boolean;
  staticProofReason: string | null;

  // Bypass-Linie für Anfänger empfohlen?
  bypassRecommended: boolean;
}

// ────────────────────────────────────────────────────────────────────
// Hauptinterface
// ────────────────────────────────────────────────────────────────────

export interface Module {
  // Identität
  slug: string;            // z.B. "skinny", "tabletop", "drop-60"
  number: string;          // z.B. "M01", "M02" — DREK-Look
  name: string;            // z.B. "SKINNY"
  nameLong: string;        // z.B. "Skinny / Wood Path / Balkenbahn"
  category: ModuleCategory;

  // Kurzer Pitch (1–2 Sätze, font-serif italic auf Detailseite)
  tagline: string;

  // Längere Beschreibung (2–4 Sätze, Kontext)
  description: string;

  // Skill-Varianten — meistens 3, manchmal nur 1–2
  variants: SkillVariant[];

  // Vorfertigung
  prefab: PrefabInfo;

  // Fundament-Empfehlung (gilt meist über alle Skill-Varianten)
  foundation: FoundationType[];
  foundationNote: string | null;

  // Sicherheit
  safety: SafetyInfo;

  // Build-Plan-Zuordnung (welche Phase 1–5)
  buildPhase: 1 | 2 | 3 | 4 | 5;

  // Quellen / Referenzen
  references: string[];

  // Tags für Filter (frei)
  tags: string[];
}
