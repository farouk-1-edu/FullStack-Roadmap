import { useProgress } from '../hooks/useProgress';
import { phases } from '../data/phases';

export default function ProgressTracker() {
  const {
    overallProgress, phaseProgress, completedTopicsCount, totalTopics,
    completedProjectsCount, totalProjects, completedCertificationsCount, totalCertifications,
    progress,
  } = useProgress();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Progress Tracker</h1>
        <p className="text-[var(--text-secondary)] mt-1">Calculated from your actual checkboxes and actions.</p>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{overallProgress}%</div>
          <div className="text-sm text-[var(--text-secondary)]">Overall</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{completedTopicsCount}/{totalTopics}</div>
          <div className="text-sm text-[var(--text-secondary)]">Topics</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{completedProjectsCount}/{totalProjects}</div>
          <div className="text-sm text-[var(--text-secondary)]">Projects</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
          <div className="text-3xl font-bold">{completedCertificationsCount}/{totalCertifications}</div>
          <div className="text-sm text-[var(--text-secondary)]">Certifications</div>
        </div>
      </div>
      <div className="space-y-3">
        <h2 className="font-bold">Phase Progress</h2>
        {phases.map(p => {
          const pct = phaseProgress(p.id);
          return (
            <div key={p.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
              <div className="flex justify-between text-sm mb-1">
                <span>Phase {p.number}: {p.shortName}</span>
                <span>{pct}%</span>
              </div>
              <div className="w-full bg-[var(--border)] rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-sm text-[var(--text-secondary)]">
        Streak: {progress.streak} · Last study: {progress.lastStudyDate || '—'} · Weekly hours: {progress.weeklyHoursLogged}/{progress.weeklyHoursGoal}
      </div>
    </div>
  );
}
