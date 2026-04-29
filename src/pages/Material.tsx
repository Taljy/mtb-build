import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MaterialCategory } from "@/types";
import { loadMaterials, loadModules } from "@/lib/loader";
import { useBudgetSelection } from "@/lib/useBudgetSelection";
import Eyebrow from "@/components/Eyebrow";
import MaterialTable from "@/components/MaterialTable";
import ModuleConfiguratorRow from "@/components/ModuleConfiguratorRow";
import BudgetSummary from "@/components/BudgetSummary";

const CATEGORY_ORDER: MaterialCategory[] = [
  "holz",
  "schraube",
  "beschlag",
  "fundament",
  "antirutsch",
  "armierung",
  "spezial",
];

const PHASE_LABELS: Record<number, string> = {
  1: "PHASE 1 — FUNDAMENTE & STRUKTUR",
  2: "PHASE 2 — BALANCE & FLOW",
  3: "PHASE 3 — SPRÜNGE & DROPS",
  4: "PHASE 4 — NORTHSHORE & ÜBERGÄNGE",
  5: "PHASE 5 — PUMPTRACK & FINISH",
};

export default function Material() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") === "konfigurator" ? "konfigurator" : "standards";

  function handleTabChange(value: string) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("tab", value);
      return next;
    });
  }

  // ── Standards data ──────────────────────────────────────────────
  const materialsByCategory = useMemo(() => {
    const catalog = loadMaterials();
    const map: Partial<Record<MaterialCategory, ReturnType<typeof loadMaterials>[string][]>> = {};
    for (const m of Object.values(catalog)) {
      if (!map[m.category]) map[m.category] = [];
      map[m.category]!.push(m);
    }
    return map;
  }, []);

  // ── Konfigurator data ────────────────────────────────────────────
  const modules = useMemo(
    () =>
      [...loadModules()].sort((a, b) =>
        a.buildPhase !== b.buildPhase
          ? a.buildPhase - b.buildPhase
          : a.number.localeCompare(b.number)
      ),
    []
  );

  const {
    selection,
    setVariant,
    clearAll,
    selectedModules,
    totalChf,
    byCategory,
  } = useBudgetSelection();

  const selectedCount = selectedModules.length;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule pb-8 mb-8">
        <Eyebrow>WERKSTATT · MATERIAL & BUDGET</Eyebrow>
        <h1>MATERIAL</h1>
        <p className="mt-1 text-asphalt text-sm">
          Standards für die Schreinerei. Budget für die Anlage.
        </p>
      </section>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="h-auto w-full justify-start rounded-none border-b border-rule bg-transparent p-0 mb-8">
          {[
            { value: "standards",    label: "STANDARDS" },
            { value: "konfigurator", label: "KONFIGURATOR" },
          ].map(({ value, label }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="rounded-none border-b-2 border-transparent bg-transparent px-4 pb-3 pt-1 font-mono text-xs tracking-[0.18em] uppercase shadow-none text-asphalt hover:text-ink data-[state=active]:border-vermillion data-[state=active]:text-ink data-[state=active]:shadow-none"
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ── STANDARDS ──────────────────────────────────────────── */}
        <TabsContent value="standards">
          {/* Intro */}
          <div className="mb-10 max-w-2xl">
            <p className="font-serif text-lg italic text-asphalt leading-relaxed">
              70 % KVH Fichte für die Innenstruktur — statisch optimal, günstig, werkstattfreundlich.
              20 % Lärche für alle Aussen- und Belagsflächen — witterungsbeständig ohne Behandlung,
              sägerau für maximalen Grip. 10 % Eiche oder Robinie für hochbelastete Knoten und Gelenke.
              Edelstahl A4 zwingend für alle Verbindungsmittel — Weissstahl korrodiert in 2–3 Saisons.
            </p>
          </div>

          {CATEGORY_ORDER.map((cat) => {
            const mats = materialsByCategory[cat];
            if (!mats || mats.length === 0) return null;
            return (
              <MaterialTable key={cat} category={cat} materials={mats} />
            );
          })}
        </TabsContent>

        {/* ── KONFIGURATOR ───────────────────────────────────────── */}
        <TabsContent value="konfigurator" className="pb-32">
          {/* Intro */}
          <p className="mb-8 text-asphalt text-sm max-w-2xl">
            Wähle deine Skill-Variante pro Modul. Budget rechnet live,
            CSV-Export für die Werkstatt-Wand. «—» entfernt ein Modul aus dem Budget.
          </p>

          {/* Module rows grouped by phase */}
          {([1, 2, 3, 4, 5] as const).map((phase) => {
            const phaseModules = modules.filter((m) => m.buildPhase === phase);
            if (phaseModules.length === 0) return null;
            return (
              <div key={phase} className="mb-6">
                <div className="flex items-center gap-4 mb-3 pt-2 border-t border-rule">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-concrete">
                    {PHASE_LABELS[phase]}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {phaseModules.map((m) => (
                    <ModuleConfiguratorRow
                      key={m.slug}
                      module={m}
                      selected={selection[m.slug] ?? null}
                      onSelect={(level) => setVariant(m.slug, level)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* Sticky footer */}
          <BudgetSummary
            selectedCount={selectedCount}
            totalModules={modules.length}
            totalChf={totalChf}
            byCategory={byCategory}
            selectedModules={selectedModules}
            onClear={clearAll}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
