import { Slider } from "@/components/ui/slider";
import Eyebrow from "./Eyebrow";

interface DrekSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (v: number) => void;
}

export default function DrekSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
}: DrekSliderProps) {
  return (
    <div className="select-none">
      <div className="mb-2 flex items-baseline justify-between">
        <Eyebrow>{label}</Eyebrow>
        <span className="font-display text-2xl text-pitch leading-none">
          {value}
          <span className="font-mono text-xs tracking-[0.18em] text-asphalt ml-1 uppercase">
            {unit}
          </span>
        </span>
      </div>

      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(vals) => onChange(Array.isArray(vals) ? vals[0] : vals)}
        className="[&_[data-slot=slider-track]]:bg-rule [&_[data-slot=slider-track]]:h-[3px] [&_[data-slot=slider-track]]:rounded-none [&_[data-slot=slider-range]]:bg-vermillion [&_[data-slot=slider-range]]:rounded-none [&_[data-slot=slider-thumb]]:h-4 [&_[data-slot=slider-thumb]]:w-4 [&_[data-slot=slider-thumb]]:rounded-none [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-ink [&_[data-slot=slider-thumb]]:bg-paper [&_[data-slot=slider-thumb]]:shadow-none [&_[data-slot=slider-thumb]]:ring-offset-paper hover:[&_[data-slot=slider-thumb]]:border-vermillion focus-visible:[&_[data-slot=slider-thumb]]:ring-2 focus-visible:[&_[data-slot=slider-thumb]]:ring-vermillion focus-visible:[&_[data-slot=slider-thumb]]:ring-offset-2"
      />

      <div className="mt-1 flex justify-between font-mono text-[10px] tracking-[0.14em] text-concrete uppercase">
        <span>{min} {unit}</span>
        <span>{max} {unit}</span>
      </div>
    </div>
  );
}
