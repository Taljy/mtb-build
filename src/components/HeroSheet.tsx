import Eyebrow from "@/components/Eyebrow";

interface HeroSheetProps {
  src: string;
  alt: string;
  eyebrow: string;
  subtitle: string;
}

export default function HeroSheet({ src, alt, eyebrow, subtitle }: HeroSheetProps) {
  return (
    <section className="py-12 border-t border-rule">
      <Eyebrow>{eyebrow}</Eyebrow>
      <p className="font-serif text-lg italic text-asphalt mt-2 mb-6 max-w-[55ch]">
        {subtitle}
      </p>
      <div className="bg-paper-deep border border-rule p-4 md:p-8">
        <img
          src={src}
          alt={alt}
          className="w-full h-auto object-contain max-h-[80vh] mx-auto block"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}
