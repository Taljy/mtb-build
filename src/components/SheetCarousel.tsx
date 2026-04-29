import { useEffect, useRef, useState } from "react";
import Eyebrow from "@/components/Eyebrow";

interface Sheet {
  src: string;
  alt: string;
  caption: string;
}

interface SheetCarouselProps {
  sheets: Sheet[];
}

export default function SheetCarousel({ sheets }: SheetCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observers = sheets.map((_, i) => {
      const slide = track.children[i] as HTMLElement;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { root: track, threshold: 0.6 }
      );
      obs.observe(slide);
      return obs;
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sheets.length]);

  return (
    <section className="py-12 border-t border-rule">
      <Eyebrow>WERKSTATT-DOKUMENTATION · 4 ANSICHTEN</Eyebrow>
      <p className="font-serif italic text-asphalt mt-2 mb-8 max-w-[55ch]">
        Brand-Sheet, Seitenansicht, 3D-Ansicht, Grundriss.
      </p>

      {/* Mobile: scroll-snap */}
      <div className="md:hidden">
        <div
          ref={trackRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4 gap-4"
        >
          {sheets.map((s, i) => (
            <div key={i} className="flex-shrink-0 w-[85%] snap-start">
              <div className="bg-paper-deep border border-rule p-3">
                <img
                  src={s.src}
                  alt={s.alt}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-asphalt mt-3">
                  {s.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-asphalt text-center mt-4">
          {String(activeIndex + 1).padStart(2, "0")} / {String(sheets.length).padStart(2, "0")}
        </p>
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sheets.map((s, i) => (
          <div
            key={i}
            className="bg-paper-deep border border-rule p-3 hover:border-ink transition-colors"
          >
            <img
              src={s.src}
              alt={s.alt}
              className="w-full h-auto"
              loading="lazy"
              decoding="async"
            />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-asphalt mt-3">
              {s.caption}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
