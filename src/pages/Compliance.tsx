import Eyebrow from "@/components/Eyebrow";
import HairlineCard from "@/components/HairlineCard";
import ComplianceSection from "@/components/ComplianceSection";
import ChecklistItem from "@/components/ChecklistItem";
import DecisionTree from "@/components/DecisionTree";
import StaticProofMatrix from "@/components/StaticProofMatrix";
import { BfuLink } from "@/components/BfuLink";

const insuranceSteps = [
  {
    question: "Wer nutzt die Anlage?",
    options: [
      {
        answer: "Nur ich",
        leadsTo:
          "Stufe 1 — Privatrisiko. Privathaftpflicht mit Sportanlage-Zusatz schriftlich bestätigen.",
      },
      {
        answer: "Familie & Freunde",
        leadsTo:
          "Stufe 2 — Quasi-öffentlich. Sportanlagen-Zusatz zur Privathaftpflicht obligatorisch.",
      },
      {
        answer: "Events / Eintritt / Vermietung",
        leadsTo:
          "Stufe 3 — Gewerblich. Betriebshaftpflicht Sportanlage zwingend, separater Vertrag.",
      },
    ],
  },
  {
    question: "Bist du der Werkeigentümer?",
    options: [
      {
        answer: "Ja",
        leadsTo:
          "Art. 58 OR gilt — verschuldensunabhängige Haftung. Kein Haftungsausschluss möglich.",
      },
      {
        answer: "Miete / Pacht",
        leadsTo:
          "Haftung je nach Vertrag — schriftliche Klärung mit Rechtsanwalt vor Baubeginn.",
      },
    ],
  },
  {
    question: "Module > 1.5 m Höhe vorhanden?",
    options: [
      {
        answer: "Ja (Wallride, Drop-100, Northshore)",
        leadsTo:
          "Statiknachweis SIA 265 + Brüstung nach EN 14974 ab 1 m Absturzhöhe zwingend.",
      },
      {
        answer: "Nein",
        leadsTo:
          "Eigenkontrolle nach Checkliste Section 01 genügt. Jährliche Hauptinspektion dokumentieren.",
      },
    ],
  },
];

export default function Compliance() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-rule pb-12 mb-0">
        <Eyebrow>RECHT & SICHERHEIT · 6 BEREICHE</Eyebrow>
        <h1>COMPLIANCE</h1>
        <p className="mt-2 font-serif text-xl italic text-asphalt leading-relaxed max-w-[55ch]">
          Was du wissen musst, bevor du das erste Brett zuschneidest.
        </p>

        <HairlineCard className="mt-6 border-vermillion bg-paper-deep">
          <p className="font-mono text-xs tracking-[0.14em] text-asphalt leading-relaxed">
            Diese Seite ist keine Rechtsberatung. Schweizer Bau- und Haftungsrecht ist
            komplex und kantonal verschieden. Voranfrage beim Bauamt Baden und beim Kanton
            Aargau BVU ist der erste konkrete Schritt vor jeder Materialbeschaffung.
          </p>
        </HairlineCard>
      </section>

      {/* ── Section 01: SN EN 14974 ────────────────────────────── */}
      <ComplianceSection
        number="01"
        title="SN EN 14974"
        subtitle="Skateparks-Norm als Referenz"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-6">
          Die SN EN 14974 gilt primär für öffentliche Skateparks mit Hartoberflächen und
          schliesst BMX explizit ein. Eine MTB-spezifische Norm existiert nicht — die BFU
          empfiehlt die EN 14974 deshalb ausdrücklich als Mindestmassstab für private
          Mischanlagen, sobald Dritte Zugang haben. Für einen Holz-Bikepark in der
          Schreinerei-Zone gilt sie de facto.
        </p>

        <div className="flex flex-col gap-3">
          <ChecklistItem
            required
            label="Sicherheitsbereich ≥ 2 m hindernisfrei"
            detail="Um jedes Element müssen mindestens 2 m in alle Richtungen frei von Hindernissen sein. Gilt auch für Überlapp-Zonen zwischen zwei Modulen."
          />
          <ChecklistItem
            required
            label="Absturzsicherung ab 1 m Absturzhöhe"
            detail="Brüstungen oder Geländer mindestens 1.2 m hoch. Betrifft Northshore, Drop-100-Plattform und alle Verbindungsbohlen > 1 m über Grund."
          />
          <ChecklistItem
            required
            label="Aussen erreichbare Kanten ≥ 3 mm gerundet"
            detail="Keine scharfen Schnittkanten an Stellen, die bei einem Sturz berührt werden können. Hobelkante oder Fassung genügt."
          />
          <ChecklistItem
            required
            label="Edelstahlschrauben metrisch, korrosionsgeschützt"
            detail="Weissstahl rostet in 2–3 Saisons durch und verliert Tragkraft. Edelstahl A4 (AISI 316) ist das Mindestmass für alle Aussenverbindungen."
          />
          <ChecklistItem
            required
            label="Wöchentliche Sichtkontrolle dokumentiert"
            detail="Lockere Schrauben, Splitter, Risse in Belagbohlen — Formular in der Werkstatt, Datum und Unterschrift. Im Schadensfall entscheidend."
          />
          <ChecklistItem
            required
            label="Jährliche Hauptinspektion durch Sachkundigen"
            detail="Einmal pro Jahr formale Inspektion aller tragenden Verbindungen, Fundamente und Beläge. Mario kann diese selbst durchführen — dokumentiert."
          />
          <ChecklistItem
            required={false}
            label="Mindestalter 8 Jahre"
            detail="EN 14974 nennt 8 Jahre als Mindestalter für Skatepark-Elemente. Hinweistafel empfohlen, rechtlich nicht zwingend für private Anlagen."
          />
        </div>
      </ComplianceSection>

      {/* ── Section 02: BFU 2.011 ─────────────────────────────── */}
      <ComplianceSection
        number="02"
        title="BFU-EMPFEHLUNG 2.011"
        subtitle="Fachdokumentation Skatepark und Bikepark"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          Die BFU (Beratungsstelle für Unfallverhütung) veröffentlicht die Fachdokumentation
          2.011 «Skatepark und Bikepark» — kostenlos bestellbar unter bfu.ch. Sie ist kein
          Gesetz, aber Schweizer Gerichte orientieren sich an BFU-Empfehlungen als anerkannte
          Sorgfaltsstandards.
        </p>
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          Kernpunkt: Die BFU empfiehlt die SN EN 14974 als Minimum auch für private Anlagen,
          sobald Dritte — Familienmitglieder, Mitarbeitende, Gäste — Zugang haben. Das ist
          bei Marios Schreinerei-Bikepark der Normalfall.
        </p>
        <div className="border border-rule px-4 py-3 mt-4 flex flex-col gap-1">
          <p className="font-mono text-xs tracking-[0.14em] text-asphalt">
            QUELLE — Fachdokumentation 2.011 · Kostenlos als PDF
          </p>
          <BfuLink />
        </div>
      </ComplianceSection>

      {/* ── Section 03: Art. 58 OR ────────────────────────────── */}
      <ComplianceSection
        number="03"
        title="WERKEIGENTÜMERHAFTUNG"
        subtitle="Art. 58 Obligationenrecht"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          Art. 58 OR begründet eine verschuldensunabhängige Haftung des Werkeigentümers für
          Schäden, die durch mangelhafte Erstellung oder Unterhalt eines Werks entstehen.
          «Werk» im Rechtssinne ist jede dauerhafte, mit dem Boden verbundene oder ortsfeste
          Konstruktion — ein Bikepark qualifiziert eindeutig.
        </p>
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          Die Haftung gilt auf Privatgrund und ist nicht abdingbar. Ein Hinweisschild
          «Befahren auf eigene Gefahr» reicht juristisch nicht aus — weder als
          Haftungsausschluss noch als Beweismittel für sorgfältigen Unterhalt. Sobald Dritte
          den Park nutzen, gilt faktisch der gleiche Massstab wie für eine öffentliche Anlage.
        </p>
        <div className="border border-rule px-4 py-3 mt-4">
          <p className="font-mono text-xs tracking-[0.14em] text-asphalt">
            QUELLEN — BFU Fachdokumentation 2.011 · weka.ch Haftungsrecht Schweiz ·
            OR Art. 58 (Werkeigentümerhaftung)
          </p>
        </div>
      </ComplianceSection>

      {/* ── Section 04: Bewilligung ───────────────────────────── */}
      <ComplianceSection
        number="04"
        title="BEWILLIGUNG AARGAU & BADEN"
        subtitle="§ 6 Baugesetz Aargau — Baupflicht"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          § 6 BauG Aargau: Bauten, Anlagen und wesentliche Geländegestaltungen sind
          bewilligungspflichtig. Die Schwelle für bewilligungsfreie Kleinstbauten (5 m²,
          2.5 m Höhe) überschreitet ein Bikepark schon mit den ersten drei Modulen.
          Kein Weg daran vorbei.
        </p>
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-6">
          Die gute Nachricht: In der Gewerbezone einer Schreinerei ist eine Sportanlage
          bewilligungsfähig — kein Grundsatzproblem, nur Verfahren. Ausserhalb der Bauzone
          (Landwirtschaftszone, Wald) ist sie praktisch ausgeschlossen.
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {[
            {
              num: "01",
              label: "Voranfrage Gemeindebauamt Baden",
              detail:
                "Formlose schriftliche Anfrage mit Lageplan und grober Skizze. Klärung Zonenkonformität und Verfahrensweg. Kein Kostenrisiko.",
            },
            {
              num: "02",
              label: "Voranfrage Kanton Aargau BVU",
              detail:
                "Bau- und Umweltschutzdirektion — bei Spezialthemen (Lärmschutz, Abstände). Optional, aber empfohlen vor der Projektierung.",
            },
            {
              num: "03",
              label: "Zonenprüfung als Priorität 1",
              detail:
                "Gewerbezone Schreinerei → machbar. Wohnzone → schwierig. Landwirtschaftszone → praktisch ausgeschlossen.",
            },
          ].map(({ num, label, detail }) => (
            <div key={num} className="flex gap-4 border border-rule p-4 bg-paper-deep">
              <span className="font-display text-3xl text-concrete leading-none shrink-0">
                {num}
              </span>
              <div>
                <p className="font-display text-lg text-pitch leading-snug">{label}</p>
                <p className="mt-1 text-sm text-asphalt">{detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-rule px-4 py-3 bg-paper-deep">
          <p className="font-mono text-xs tracking-[0.18em] text-ink">
            BAUZONE PRÜFEN VOR ALLEM ANDEREN
          </p>
        </div>
      </ComplianceSection>

      {/* ── Section 05: Versicherung ──────────────────────────── */}
      <ComplianceSection
        number="05"
        title="VERSICHERUNGSSTUFEN"
        subtitle="Privat → Quasi-öffentlich → Gewerblich"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-6">
          Marios bestehende Privathaftpflicht und die Gebäudehaftpflicht der Schreinerei
          decken einen privaten Bikepark nicht automatisch ab — Sportanlagen sind
          typischerweise ausgeschlossen oder auf minimale Deckungssummen limitiert. Welche
          Stufe zutrifft, hängt vom Nutzerkreis ab.
        </p>

        <DecisionTree steps={insuranceSteps} />

        <p className="mt-6 font-serif text-lg italic text-asphalt leading-relaxed">
          In allen drei Fällen gilt: schriftliche Bestätigung des Risikoeinschlusses beim
          Versicherer einholen, bevor das erste Modul in Betrieb geht. Eine mündliche Zusage
          hilft im Schadensfall niemandem.
        </p>
      </ComplianceSection>

      {/* ── Section 06: Statik ────────────────────────────────── */}
      <ComplianceSection
        number="06"
        title="STATIKNACHWEIS SIA 265"
        subtitle="Tragsicherheit personentragender Konstruktionen"
      >
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-4">
          SIA 261 (Einwirkungen auf Tragwerke) und SIA 265 (Holzbau) sind die anerkannten
          Regeln der Technik in der Schweiz. Für personentragende Konstruktionen ab 1.5 m
          Höhe oder mit Spannweiten über 2 m ist ein Tragsicherheitsnachweis durch einen
          Bauingenieur SIA de facto verlangt — auch wenn kein Bauingenieur auf dem
          Baubewilligungsgesuch steht.
        </p>
        <p className="font-serif text-lg italic text-asphalt leading-relaxed mb-6">
          Mario kann alle 19 Module selbst konstruieren und bauen. Für die vier Module mit
          Pflicht-Statiknachweis empfiehlt sich ein Ingenieur für 2–4 Stunden Prüfung —
          das kostet weniger als ein Schaden.
        </p>

        <StaticProofMatrix />
      </ComplianceSection>

      {/* ── Empfohlene Schritte ───────────────────────────────── */}
      <section className="border-t border-rule mt-12 pt-12">
        <Eyebrow accent>BEVOR DU LOSLEGST</Eyebrow>
        <h2 className="display-s text-pitch mb-8">DREI KONKRETE SCHRITTE</h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-8">
          {[
            {
              num: "01",
              label: "BFU-Fachdokumentation 2.011 bestellen",
              detail: "Kostenlos. Gibt dir den offiziellen Rahmen, auf den du dich beziehen kannst.",
            },
            {
              num: "02",
              label: "Voranfrage Bauamt Baden + BVU AG",
              detail:
                "Schriftlich, formlos. Klärt Zonenkonformität bevor du einen Franken ausgibst.",
            },
            {
              num: "03",
              label: "Versicherungsbestätigung einholen",
              detail:
                "Schriftlicher Nachweis Sportanlagen-Einschluss vom Versicherer — Stufe je nach Nutzerkreis.",
            },
          ].map(({ num, label, detail }) => (
            <div key={num} className="border border-rule p-5 bg-paper-deep">
              <p className="font-display text-5xl text-concrete leading-none mb-3">{num}</p>
              <p className="font-display text-lg text-pitch leading-snug mb-2">{label}</p>
              <p className="text-sm text-asphalt">{detail}</p>
            </div>
          ))}
        </div>

        <p className="font-serif text-lg italic text-asphalt leading-relaxed max-w-[65ch]">
          Diese drei Schritte kosten kein Geld, schützen aber vor sechsstelligen Rückbau-
          und Haftungskosten.
        </p>
      </section>
    </>
  );
}
