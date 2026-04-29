import Eyebrow from "@/components/Eyebrow";
import HairlineCard from "@/components/HairlineCard";
import ModuleCard from "@/components/ModuleCard";
import ModuleFilter from "@/components/ModuleFilter";
import { useModuleFilter } from "@/lib/useModuleFilter";

export default function ModuleList() {
  const { filtered, hasActiveFilters, clearAll, total } = useModuleFilter();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule py-12">
        <Eyebrow>KATALOG · {total} MODULE</Eyebrow>
        <h1>MODULE</h1>
        <p className="mt-2 text-asphalt">
          Alle Module im Überblick. Filter setzen, Details öffnen.
        </p>
      </section>

      {/* Filter */}
      <section className="mt-8">
        <ModuleFilter />
      </section>

      {/* Grid / empty state */}
      <section className="mt-8">
        {filtered.length === 0 ? (
          <HairlineCard className="py-16 text-center">
            <p className="display-s text-pitch">KEINE MODULE GEFUNDEN</p>
            <p className="mt-4 font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              {total} MODULE TOTAL
            </p>
            <button
              type="button"
              onClick={clearAll}
              className="mt-6 font-mono text-xs tracking-[0.18em] uppercase text-vermillion transition-colors hover:text-vermillion-deep"
            >
              FILTER ZURÜCKSETZEN
            </button>
          </HairlineCard>
        ) : (
          <>
            {hasActiveFilters && (
              <p className="mb-4 font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
                {filtered.length} VON {total} MODULEN
              </p>
            )}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((module) => (
                <ModuleCard key={module.slug} module={module} />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
