interface DecisionStep {
  question: string;
  options: { answer: string; leadsTo: string }[];
}

interface DecisionTreeProps {
  steps: DecisionStep[];
}

export default function DecisionTree({ steps }: DecisionTreeProps) {
  return (
    <div className="flex flex-col divide-y divide-rule border border-rule">
      {steps.map((step, i) => (
        <div key={i} className="p-5">
          <div className="flex items-start gap-4 mb-4">
            <span className="font-display text-4xl text-concrete leading-none shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="font-display text-2xl text-pitch leading-tight pt-1">
              {step.question}
            </p>
          </div>
          <div className="flex flex-col gap-2 pl-14">
            {step.options.map((opt) => (
              <div
                key={opt.answer}
                className="flex items-baseline gap-2 flex-wrap"
              >
                <span className="font-mono text-xs tracking-[0.14em] border border-rule px-2 py-1 text-ink shrink-0 whitespace-nowrap">
                  {opt.answer}
                </span>
                <span className="font-mono text-[10px] text-concrete shrink-0">→</span>
                <span className="font-mono text-xs text-asphalt">{opt.leadsTo}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
