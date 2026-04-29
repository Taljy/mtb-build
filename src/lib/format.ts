/**
 * Format-Helper für mtb-build
 *
 * Konsistente Darstellung von CHF-Beträgen, Massen, Winkeln, Skill-Labels.
 * Schweizer Hochdeutsch (ss statt ß), Mittelpunkt (·) als Trenner.
 */

import type { SkillLevel, ModuleCategory, FoundationType, BomUnit } from "@/types";

// ────────────────────────────────────────────────────────────────────
// Geld
// ────────────────────────────────────────────────────────────────────

/** "CHF 1'250" */
export function formatChf(amount: number): string {
  const rounded = Math.round(amount);
  const withApostrophes = rounded.toLocaleString("de-CH").replace(/,/g, "'");
  return `CHF ${withApostrophes}`;
}

/** "CHF 1'250–2'400" */
export function formatChfRange(min: number, max: number): string {
  if (Math.round(min) === Math.round(max)) return formatChf(min);
  return `${formatChf(min).replace("CHF ", "CHF ")}–${Math.round(max).toLocaleString("de-CH").replace(/,/g, "'")}`;
}

// ────────────────────────────────────────────────────────────────────
// Masse
// ────────────────────────────────────────────────────────────────────

/** cm → "120 cm" oder "1.2 m" wenn >= 100 */
export function formatLength(cm: number | null): string {
  if (cm === null) return "—";
  if (cm >= 100) return `${(cm / 100).toFixed(cm % 10 === 0 ? 1 : 2)} m`;
  return `${cm} cm`;
}

/** Grad → "30°" */
export function formatAngle(deg: number | null): string {
  if (deg === null) return "—";
  return `${deg}°`;
}

/** km/h → "20 km/h" */
export function formatSpeed(kmh: number): string {
  return `${kmh} km/h`;
}

/** Speed-Range "16–20 km/h" */
export function formatSpeedRange(range: { min: number; max: number } | null): string {
  if (range === null) return "—";
  return `${range.min}–${range.max} km/h`;
}

// ────────────────────────────────────────────────────────────────────
// Einheiten (BOM)
// ────────────────────────────────────────────────────────────────────

const UNIT_LABELS: Record<BomUnit, string> = {
  stk: "Stk",
  lfm: "lfm",
  m2: "m²",
  kg: "kg",
};

export function formatBomQuantity(quantity: number, unit: BomUnit): string {
  // 1.5 lfm, 12 lfm, 0.8 kg, 4 Stk
  const q = quantity % 1 === 0 ? quantity.toString() : quantity.toFixed(1);
  return `${q} ${UNIT_LABELS[unit]}`;
}

// ────────────────────────────────────────────────────────────────────
// Skill / Kategorie / Fundament Labels
// ────────────────────────────────────────────────────────────────────

const SKILL_LABELS: Record<SkillLevel, string> = {
  anfaenger: "ANFÄNGER",
  mittel: "MITTEL",
  fortgeschritten: "FORTG.",
};

const SKILL_LABELS_LONG: Record<SkillLevel, string> = {
  anfaenger: "Anfänger",
  mittel: "Mittel",
  fortgeschritten: "Fortgeschritten",
};

export function skillLabel(level: SkillLevel, long = false): string {
  return long ? SKILL_LABELS_LONG[level] : SKILL_LABELS[level];
}

const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  balance: "Balance",
  anlieger: "Anlieger",
  sprung: "Sprung",
  drop: "Drop",
  northshore: "Northshore",
  pumptrack: "Pumptrack",
  transition: "Transition",
};

export function categoryLabel(cat: ModuleCategory): string {
  return CATEGORY_LABELS[cat];
}

const FOUNDATION_LABELS: Record<FoundationType, string> = {
  krinner: "Krinner-Schraubfundament",
  punktfundament: "Punktfundament Beton",
  erdspiess: "Erdspiess",
  splittbett: "Splittbett",
  lose: "lose / Eigengewicht",
};

export function foundationLabel(f: FoundationType): string {
  return FOUNDATION_LABELS[f];
}

// ────────────────────────────────────────────────────────────────────
// Trenner und Mono-Lines
// ────────────────────────────────────────────────────────────────────

/** "A · B · C" */
export function joinDot(parts: (string | number)[]): string {
  return parts.map(String).join(" · ");
}

/** "M01 · TABLETOP · SPRUNG" */
export function moduleSlug(module: { number: string; name: string; category: ModuleCategory }): string {
  return joinDot([module.number, module.name, categoryLabel(module.category).toUpperCase()]);
}
