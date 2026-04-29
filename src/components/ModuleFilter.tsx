import { useSearchParams } from "react-router-dom";
import Eyebrow from "./Eyebrow";
import Chip from "./Chip";

type FilterKey = "cat" | "skill" | "phase" | "prefab";

const FILTERS: {
  key: FilterKey;
  label: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "cat",
    label: "KATEGORIE",
    options: [
      { value: "balance",    label: "BALANCE" },
      { value: "anlieger",   label: "ANLIEGER" },
      { value: "sprung",     label: "SPRUNG" },
      { value: "drop",       label: "DROP" },
      { value: "northshore", label: "NORTHSHORE" },
      { value: "pumptrack",  label: "PUMPTRACK" },
      { value: "transition", label: "TRANSITION" },
    ],
  },
  {
    key: "skill",
    label: "SKILL",
    options: [
      { value: "anfaenger",       label: "ANFÄNGER" },
      { value: "mittel",          label: "MITTEL" },
      { value: "fortgeschritten", label: "FORTG." },
    ],
  },
  {
    key: "phase",
    label: "PHASE",
    options: [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
      { value: "5", label: "5" },
    ],
  },
  {
    key: "prefab",
    label: "PREFAB",
    options: [
      { value: "100", label: "≥ 100%" },
      { value: "80",  label: "≥ 80%" },
      { value: "60",  label: "≥ 60%" },
    ],
  },
];

function getSelected(params: URLSearchParams, key: FilterKey): string[] {
  const val = params.get(key);
  return val ? val.split(",").filter(Boolean) : [];
}

export default function ModuleFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  function toggle(key: FilterKey, value: string) {
    const current = getSelected(searchParams, key);
    const next =
      key === "prefab"
        ? current.includes(value) ? [] : [value]
        : current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value];

    const p = new URLSearchParams(searchParams);
    if (next.length === 0) p.delete(key);
    else p.set(key, next.join(","));
    setSearchParams(p);
  }

  const hasActive = FILTERS.some((f) => getSelected(searchParams, f.key).length > 0);

  return (
    <div className="border border-rule bg-paper-deep p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {FILTERS.map((filter) => (
          <div key={filter.key}>
            <Eyebrow>{filter.label}</Eyebrow>
            <div className="mt-1 flex flex-wrap gap-2">
              {filter.options.map((opt) => (
                <Chip
                  key={opt.value}
                  active={getSelected(searchParams, filter.key).includes(opt.value)}
                  onClick={() => toggle(filter.key, opt.value)}
                >
                  {opt.label}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>

      {hasActive && (
        <div className="mt-4 flex justify-end border-t border-rule pt-4">
          <button
            type="button"
            onClick={() => setSearchParams({})}
            className="font-mono text-xs tracking-[0.18em] uppercase text-vermillion transition-colors hover:text-vermillion-deep"
          >
            FILTER ZURÜCKSETZEN ✕
          </button>
        </div>
      )}
    </div>
  );
}
