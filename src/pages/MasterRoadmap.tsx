import { Link } from 'react-router-dom';
import { phases } from '../data/phases';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, ArrowDown } from 'lucide-react';

export default function MasterRoadmap() {
  const { phaseProgress, progress, setCurrentPhase } = useProgress();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Master Roadmap</h1>
        <p className="text-[var(--text-secondary)] mt-1">
          Complete sequential path from Foundations to Capstone. Click any phase for full details.
        </p>
      </div>

      <div className="space-y-0">
        {phases.map((phase, index) => {
          const progressPct = phaseProgress(phase.id);
          const isCurrent = progress.currentPhaseId === phase.id;
          const isCompleted = progressPct === 100;

          return (
            <div key={phase.id}>
              <div
                className={`bg-[var(--card)] border rounded-xl p-5 transition-all ${
                  isCurrent
                    ? 'border-primary-500 ring-2 ring-primary-500/20'
                    : 'border-[var(--border)] hover:border-primary-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isCurrent
                        ? 'bg-primary-600 text-white'
                        : 'bg-[var(--border)] text-[var(--text-secondary)]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 size={20} /> : phase.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-lg">
                        Phase {phase.number}: {phase.name}
                      </h2>
                      {isCurrent && (
                        <span className="text-xs bg-primary-600 text-white px-2 py-0.5 rounded-full">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                      {phase.description}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-[var(--text-secondary)]">
                      <span>⏱ {phase.estimatedWeeks}</span>
                      <span>📚 {phase.topics.length} topics</span>
                      <span>🎯 {phase.projects.length} projects</span>
                      <span>Progress: {progressPct}%</span>
                    </div>
                    <div className="w-full bg-[var(--border)] rounded-full h-1.5 mt-2 max-w-xs">
                      <div
                        className="bg-primary-600 h-1.5 rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Link
                        to={`/phase/${phase.id}`}
                        className="text-sm font-medium text-primary-600 hover:underline"
                      >
                        View full details →
                      </Link>
                      {!isCurrent && (
                        <button
                          onClick={() => setCurrentPhase(phase.id)}
                          className="text-sm text-[var(--text-secondary)] hover:text-[var(--text)]"
                        >
                          Set as current
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {index < phases.length - 1 && (
                <div className="flex justify-center py-2">
                  <ArrowDown size={20} className="text-[var(--text-secondary)]" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
