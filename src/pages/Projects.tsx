import { projects } from '../data/projects';
import { phases } from '../data/phases';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, Circle } from 'lucide-react';

export default function Projects() {
  const { progress, toggleProject } = useProgress();
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Projects</h1>
        <p className="text-[var(--text-secondary)] mt-1">All required projects. Check them off as you complete them.</p>
      </div>
      {phases.map(phase => {
        const phaseProjects = projects.filter(p => p.phaseId === phase.id);
        if (phaseProjects.length === 0) return null;
        return (
          <div key={phase.id}>
            <h2 className="font-bold text-lg mb-3">Phase {phase.number}: {phase.shortName}</h2>
            <div className="space-y-3 mb-8">
              {phaseProjects.map(proj => {
                const done = progress.completedProjects.includes(proj.id);
                return (
                  <div key={proj.id} className={`bg-[var(--card)] border rounded-xl p-5 ${done ? 'border-green-500/40' : 'border-[var(--border)]'}`}>
                    <div className="flex items-start gap-3">
                      <button onClick={() => toggleProject(proj.id)}>
                        {done ? <CheckCircle2 className="text-green-500" size={22} /> : <Circle size={22} className="text-[var(--text-secondary)]" />}
                      </button>
                      <div className="flex-1">
                        <h3 className="font-bold">{proj.name}</h3>
                        <p className="text-sm text-[var(--text-secondary)] mt-1">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {proj.technologies.map(t => <span key={t} className="text-xs bg-[var(--border)] px-2 py-0.5 rounded">{t}</span>)}
                        </div>
                        {proj.checklist && (
                          <div className="mt-3 text-sm">
                            <div className="font-medium mb-1">Checklist:</div>
                            <ul className="space-y-0.5 text-[var(--text-secondary)]">
                              {proj.checklist.map((item, i) => <li key={i}>□ {item}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
