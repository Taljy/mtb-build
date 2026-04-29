/**
 * Geometrie-Typen für mtb-build
 *
 * Modul-Geometrie (statisch, in module.json) und Rechner-Parameter (dynamisch,
 * für /geometrie/sprung, /geometrie/landung, /geometrie/anlieger).
 *
 * Discriminated Union via "type"-Feld — pro Modul-Typ passende Geometrie.
 */

// ────────────────────────────────────────────────────────────────────
// Modul-Geometrie (in module.json eingebettet)
// ────────────────────────────────────────────────────────────────────

export type Geometry =
  | JumpGeometry
  | LandingGeometry
  | BermGeometry
  | DropGeometry
  | SkinnyGeometry
  | TeeterGeometry
  | NorthshoreGeometry
  | PumptrackGeometry
  ;

export interface JumpGeometry {
  type: "jump";
  lipHeight: number;       // cm
  lipAngle: number;        // Grad
  lipFlatLength: number;   // cm — flacher Abschnitt vor Kante (Equilibrium)
  jumpDistance: number;    // m — Reichweite zur Landung
  takeoffShape: "klothoide" | "kreis";
  takeoffRadius: number | null;  // cm — bei Kreis-Takeoff
}

export interface LandingGeometry {
  type: "landing";
  knuckleAngle: number;    // Grad — Winkel am Knuckle (z.B. 25)
  sweetSpotAngle: number;  // Grad — am Sweet Spot (z.B. 35)
  runoutAngle: number;     // Grad — am Auslauf (z.B. 10)
  totalLength: number;     // m — Gesamtlänge Landung
}

export interface BermGeometry {
  type: "berm";
  radius: number;                    // m
  bankAngle: number;                 // Grad — effektiver Bankwinkel (Praxis-Wert)
  bankAngleTheoretical: number | null;  // Grad — theoretischer Wert
  height: number;                    // cm — Höhe der Aussenwand
  arcDegrees: number;                // 90, 135, 180 etc.
  spiralLength: number;              // m — Klothoid-Einleitung
}

export interface DropGeometry {
  type: "drop";
  dropHeight: number;      // cm
  lipAngle: number;        // Grad — typisch 0 bis -5°
  lipLength: number;       // cm — Lippen-Länge
  landingAngle: number;    // Grad
  landingLength: number;   // m
  knuckleDistance: number; // m — Knuckle hinter Lip
}

export interface SkinnyGeometry {
  type: "skinny";
  beltWidth: number;             // cm — Breite der Lauffläche
  beamHeight: number;            // cm — Höhe über Boden
  hasCamber: boolean;            // ja = Kurven enthalten
  cambeRadius: number | null;    // m — bei Camber
}

export interface TeeterGeometry {
  type: "teeter";
  totalLength: number;     // cm — Plankenlänge
  pivotRatio: string;      // z.B. "60/40" — Anfahrt/Kippseite
  pivotHeight: number;     // cm — Höhe des Drehpunkts
  approachAngle: number;   // Grad — Neigung in Anfahrtsstellung
}

export interface NorthshoreGeometry {
  type: "northshore";
  beltWidth: number;            // cm
  beamHeight: number;            // cm — Höhe über Boden
  totalLength: number;           // m — Gesamtlänge
  hasCurve: boolean;             // gerade vs. Kurve
  curveRadius: number | null;    // m
  pillarSpacingMax: number;      // cm — max. Pfostenabstand
}

export interface PumptrackGeometry {
  type: "pumptrack";
  rollerHeight: number;          // cm — typisch 30
  crestToCrest: number;          // cm — typisch 300 (10:1-Verhältnis)
  bermRadius: number | null;     // m — bei Berm-Modul
  bermAngle: number | null;      // Grad — bei Berm-Modul
}

// ────────────────────────────────────────────────────────────────────
// Rechner-Parameter (für /geometrie/* Routen)
// ────────────────────────────────────────────────────────────────────

export interface JumpCalculatorParams {
  speedKmh: number;        // Anfahrtsgeschwindigkeit km/h
  lipAngleDeg: number;     // Lippenwinkel Grad
  lipHeightCm: number;     // Lippenhöhe cm
  wheelbaseCm: number;     // Default 117 cm (Standard MTB)
}

export interface JumpCalculatorResult {
  range: number;           // m — Reichweite
  maxHeight: number;       // m — max. Flughöhe
  flightTime: number;      // s
  exitSpeedMs: number;     // m/s am Lip
  trajectoryPoints: { x: number; y: number }[]; // SVG-Punkte
  warnings: string[];
}

export interface LandingCalculatorParams {
  jumpDistance: number;    // m
  landingSlopeDeg: number; // Grad — Landungs-Hauptneigung
  heightOffsetM: number;   // m — Höhenversatz Landung über Lip (negativ = tiefer)
  takeoffSpeedKmh: number;
  takeoffAngleDeg: number;
}

export interface LandingCalculatorResult {
  efhProfile: { x: number; efh: number }[]; // EFH über Distanz
  maxEfh: number;          // m — höchster EFH-Wert
  warnings: string[];      // z.B. "EFH > 1.2 m bei x=3.4m"
  isSafe: boolean;         // EFH ≤ 1.2 m überall
}

export interface BermCalculatorParams {
  radiusM: number;         // m
  speedKmh: number;        // km/h
  practiceCorrection: boolean; // -5° bis -10° flacher als Theorie
}

export interface BermCalculatorResult {
  theoreticalAngle: number; // Grad
  practicalAngle: number;   // Grad — empfohlen für Bau
  centripetalG: number;     // Vielfaches von g
  warnings: string[];
}
