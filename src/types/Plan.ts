/**
 * Build-Plan-Typen für mtb-build
 *
 * Die 5 Aufbau-Phasen mit Modul-Zuordnungen.
 */

export interface PlanPhase {
  number: 1 | 2 | 3 | 4 | 5;
  title: string;            // z.B. "BASIS"
  subtitle: string;         // z.B. "Sandbox-Module für Werkstattprozesse"
  description: string;
  moduleSlugs: string[];    // welche Module in dieser Phase
  estimatedWeeks: number;   // Bauzeit-Schätzung netto
  cumulativeBudgetChf: {
    min: number;
    max: number;
  };
  skillCoverage: string[];  // welche Skills decken die Module ab
}

export type Plan = PlanPhase[];
