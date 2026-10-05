import { Link } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { phases } from '../data/phases';
import { CheckCircle2, Circle, ArrowRight, BookOpen, FolderKanban, Award } from 'lucide-react';

export default function Dashboard() {
  const {
    progress,
    overallProgress,
    currentPhase,
    phaseProgress,
    completedTopicsCount,
    totalTopics,
    completedProjectsCount,
    totalProjects,
    completedCertificationsCount,
    totalCertifications,
  } = useProgress();

  const nextPhase = phases.find(p => p.number === currentPhase.number + 1);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-[var(--text-secondary)] mt-1">Your personal Software Engineer learning path</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <div className="text-sm text-[var(--text-secondary)]">Overall Progress</div>
          <div className="text-3xl font-bold mt-1">{overallProgress}%</div>
          <div className="w-full bg-[var(--border)] rounded-full h-2 mt-3">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <div className="text-sm text-[var(--text-secondary)]">Topics Completed</div>
          <div className="text-3xl font-bold mt-1">{completedTopicsCount} / {totalTopics}</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <div className="text-sm text-[var(--text-secondary)]">Projects Completed</div>
          <div className="text-3xl font-bold mt-1">{completedProjectsCount} / {totalProjects}</div>
        </div>
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
          <div className="text-sm text-[var(--text-secondary)]">Weekly Hours</div>
          <div className="text-3xl font-bold mt-1">{progress.weeklyHoursLogged} / {progress.weeklyHoursGoal}</div>
        </div>
      </div>

      {/* Current Phase */}
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wide">Current Phase</div>
            <h2 className="text-xl font-bold mt-1">Phase {currentPhase.number}: {currentPhase.name}</h2>
            <p className="text-[var(--text-secondary)] mt-2 max-w-2xl">{currentPhase.description}</p>
            <div className="mt-4">
              <div className="text-sm mb-1">Phase Progress: {phaseProgress(currentPhase.id)}%</div>
              <div className="w-full max-w-md bg-[var(--border)] rounded-full h-2">
                <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${phaseProgress(currentPhase.id)}%` }} />
              </div>
            </div>
          </div>
          <Link
            to={`/phase/${currentPhase.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm font-medium"
          >
            Open Phase <ArrowRight size={16} />
          </Link>
        </div>

        {/* LEARN THIS NOW */}
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2">
              <CheckCircle2 size={18} /> LEARN THIS NOW
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              {currentPhase.learnThisNow.slice(0, 6).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <h3 className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Circle size={18} /> SKIP THIS FOR NOW
            </h3>
            <ul className="mt-2 space-y-1 text-sm">
              {currentPhase.skipThisForNow.slice(0, 5).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Link to="/projects" className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500 transition-colors flex items-center gap-3">
          <FolderKanban className="text-primary-600" />
          <div>
            <div className="font-medium">Projects</div>
            <div className="text-sm text-[var(--text-secondary)]">{completedProjectsCount} completed</div>
          </div>
        </Link>
        <Link to="/resources" className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500 transition-colors flex items-center gap-3">
          <BookOpen className="text-primary-600" />
          <div>
            <div className="font-medium">Resources</div>
            <div className="text-sm text-[var(--text-secondary)]">Free + Paid library</div>
          </div>
        </Link>
        <Link to="/certifications" className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500 transition-colors flex items-center gap-3">
          <Award className="text-primary-600" />
          <div>
            <div className="font-medium">Certifications</div>
            <div className="text-sm text-[var(--text-secondary)]">{completedCertificationsCount} / {totalCertifications}</div>
          </div>
        </Link>
      </div>

      {nextPhase && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-[var(--text-secondary)]">Next Phase</div>
            <div className="font-medium">Phase {nextPhase.number}: {nextPhase.name}</div>
          </div>
          <Link to={`/phase/${nextPhase.id}`} className="text-primary-600 text-sm font-medium flex items-center gap-1">
            Preview <ArrowRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}
