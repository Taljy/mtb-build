/**
 * Stücklisten-Typen für mtb-build
 *
 * BOM-Items referenzieren Materialien via `materialSlug` aus `material.json`.
 * Preise und Einheiten kommen zentral aus dem Material-Katalog —
 * ändert sich der Holzpreis, ändert sich nur eine Stelle.
 *
 * Berechnung: siehe lib/bom.ts (computeBomTotal)
 */

export type BomCategory =
  | "tragwerk"        // Pfosten, Stringer, Joche
  | "belag"           // Lauffläche, Bohlen, Multiplex
  | "verbindung"      // Schrauben, Beschläge
  | "fundament"       // Krinner, Beton, H-Anker
  | "oberflaeche"     // Antirutsch, Lasur, Lack
  | "armierung"       // Stahlwinkel, Streckmetall
  | "spezial"         // Achse, Buchsen, Gummidämpfer
  ;

export type BomUnit = "stk" | "lfm" | "m2" | "kg";

/**
 * Ein BOM-Item: Verweis auf Material + Menge.
 * Preis wird zur Laufzeit aus material.json gerechnet.
 */
export interface BomItem {
  category: BomCategory;
  materialSlug: string;     // z.B. "laerche-stringer-80x160"
  quantity: number;
}

/**
 * Stückliste eines Moduls/einer Variante.
 * Items sind die Roh-Eingabe, computed die berechneten Felder.
 */
export interface BillOfMaterials {
  items: BomItem[];
  notes: string | null;     // z.B. "ohne Lohn, ohne Erdarbeiten"
}

/**
 * Berechnetes BOM mit aufgelösten Preisen — Output von lib/bom.ts.
 * Wird im UI verwendet, nicht in JSON gespeichert.
 */
export interface ComputedBomItem extends BomItem {
  name: string;             // aus Material aufgelöst
  spec: string | null;
  unit: BomUnit;
  pricePerUnit: number;     // CHF
  totalPrice: number;       // CHF — quantity × pricePerUnit
}

export interface ComputedBom {
  items: ComputedBomItem[];
  totalChf: number;
  notes: string | null;
}
