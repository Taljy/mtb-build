import { useSearchParams } from "react-router-dom";
import { loadModules } from "@/lib/loader";
import type { ModuleCategory, SkillLevel } from "@/types";

export function useModuleFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const cats  = (searchParams.get("cat")?.split(",").filter(Boolean)   ?? []) as ModuleCategory[];
  const skills = (searchParams.get("skill")?.split(",").filter(Boolean) ?? []) as SkillLevel[];
  const phases = searchParams.get("phase")?.split(",").filter(Boolean).map(Number) ?? [];
  const prefabMin = searchParams.get("prefab") !== null
    ? Number(searchParams.get("prefab"))
    : null;

  const all = loadModules();

  let filtered = all as typeof all;
  if (cats.length > 0)
    filtered = filtered.filter((m) => cats.includes(m.category));
  if (skills.length > 0)
    filtered = filtered.filter((m) => m.variants.some((v) => skills.includes(v.level)));
  if (phases.length > 0)
    filtered = filtered.filter((m) => phases.includes(m.buildPhase));
  if (prefabMin !== null)
    filtered = filtered.filter((m) => m.prefab.workshopPercent >= prefabMin);

  const sorted = [...filtered].sort((a, b) =>
    a.buildPhase !== b.buildPhase
      ? a.buildPhase - b.buildPhase
      : a.number.localeCompare(b.number)
  );

  const hasActiveFilters =
    cats.length > 0 || skills.length > 0 || phases.length > 0 || prefabMin !== null;

  function clearAll() {
    setSearchParams({});
  }

  return { filtered: sorted, hasActiveFilters, clearAll, total: all.length };
}
