import { jobPrepSections } from '../data/jobPrep';
import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

export default function JobPreparation() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Job Preparation</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Start applying for internships after Phase 6 + 2–3 solid deployed projects. Junior jobs after Phase 8–10 + polished portfolio.
        </p>
      </div>
      {jobPrepSections.map(section => (
        <div key={section.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
          <h2 className="font-bold text-lg">{section.title}</h2>
          <ul className="mt-2 space-y-1 text-sm text-[var(--text-secondary)]">
            {section.content.map((c, i) => <li key={i}>• {c}</li>)}
          </ul>
          <div className="mt-4">
            <h3 className="font-medium text-sm mb-2">Checklist</h3>
            {section.checklist.map((item, i) => {
              const key = `${section.id}-${i}`;
              return (
                <button key={key} onClick={() => toggle(key)}
                  className="flex items-center gap-2 w-full text-left text-sm py-1">
                  {checked[key] ? <CheckCircle2 size={16} className="text-green-500" /> : <Circle size={16} className="text-[var(--text-secondary)]" />}
                  <span className={checked[key] ? 'line-through text-[var(--text-secondary)]' : ''}>{item}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
