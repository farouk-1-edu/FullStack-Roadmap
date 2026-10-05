import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { phases } from '../data/phases';
import { getResourcesByPhase } from '../data/resources';
import { getProjectsByPhase } from '../data/projects';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, Circle, ExternalLink, ArrowLeft } from 'lucide-react';

type Tab = 'overview' | 'topics' | 'resources' | 'projects' | 'checkpoint' | 'notes';

export default function PhaseDetail() {
  const { phaseId } = useParams<{ phaseId: string }>();
  const phase = phases.find(p => p.id === phaseId);
  const [tab, setTab] = useState<Tab>('overview');
  const { progress, toggleTopic, toggleProject, toggleCheckpoint, phaseProgress, setCurrentPhase } = useProgress();

  if (!phase) {
    return (
      <div className="text-center py-20">
        <p>Phase not found.</p>
        <Link to="/roadmap" className="text-primary-600">Back to Roadmap</Link>
      </div>
    );
  }

  const resources = getResourcesByPhase(phase.id);
  const phaseProjects = getProjectsByPhase(phase.id);
  const progressPct = phaseProgress(phase.id);

  const tabs: { id: Tab; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'topics', label: 'Topics' },
    { id: 'resources', label: 'Resources' },
    { id: 'projects', label: 'Projects' },
    { id: 'checkpoint', label: 'Checkpoint' },
    { id: 'notes', label: 'Notes' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/roadmap" className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-[var(--text)]">
        <ArrowLeft size={16} /> Back to Master Roadmap
      </Link>

      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="text-sm text-[var(--text-secondary)]">Phase {phase.number}</div>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">{phase.name}</h1>
            <p className="text-[var(--text-secondary)] mt-2">{phase.description}</p>
          </div>
          <button
            onClick={() => setCurrentPhase(phase.id)}
            className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Set as Current
          </button>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm">
          <span>⏱ {phase.estimatedWeeks}</span>
          <span>📊 {progressPct}% complete</span>
          <span>📚 {phase.topics.length} topics</span>
          <span>🎯 {phaseProjects.length} projects</span>
        </div>
        <div className="w-full bg-[var(--border)] rounded-full h-2 mt-3">
          <div className="bg-primary-600 h-2 rounded-full" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-[var(--border)] pb-px">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
              tab === t.id
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'overview' && (
        <div className="space-y-6">
          <section>
            <h2 className="font-bold text-lg mb-2">Why I need to learn it</h2>
            <p className="text-[var(--text-secondary)]">{phase.why}</p>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2">Prerequisites</h2>
            <ul className="list-disc list-inside text-[var(--text-secondary)]">
              {phase.prerequisites.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
          </section>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-green-600 dark:text-green-400">LEARN THIS NOW</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {phase.learnThisNow.map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
              <h3 className="font-semibold text-amber-600 dark:text-amber-400">SKIP THIS FOR NOW</h3>
              <ul className="mt-2 space-y-1 text-sm">
                {phase.skipThisForNow.map((item, i) => <li key={i}>• {item}</li>)}
              </ul>
            </div>
          </div>
          <section>
            <h2 className="font-bold text-lg mb-2">BUILD THIS</h2>
            <ul className="list-disc list-inside text-[var(--text-secondary)]">
              {phase.buildThis.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2">Recommended Learning Order</h2>
            <ol className="list-decimal list-inside text-[var(--text-secondary)]">
              {phase.recommendedOrder.map((item, i) => <li key={i}>{item}</li>)}
            </ol>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2">What you should be able to do after</h2>
            <ul className="list-disc list-inside text-[var(--text-secondary)]">
              {phase.expectedSkills.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2">THEN MOVE TO...</h2>
            <p className="font-medium text-primary-600">{phase.thenMoveTo}</p>
          </section>
          <section>
            <h2 className="font-bold text-lg mb-2">Mandatory vs Optional Resources</h2>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-medium text-green-600">Mandatory</h3>
                <ul className="mt-1 space-y-1 text-[var(--text-secondary)]">
                  {phase.mandatoryResources.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-secondary)]">Optional</h3>
                <ul className="mt-1 space-y-1 text-[var(--text-secondary)]">
                  {phase.optionalResources.map((r, i) => <li key={i}>• {r}</li>)}
                </ul>
              </div>
            </div>
          </section>
          {phase.exercises.length > 0 && (
            <section>
              <h2 className="font-bold text-lg mb-2">Hands-on Exercises</h2>
              <ul className="list-disc list-inside text-[var(--text-secondary)]">
                {phase.exercises.map((e, i) => <li key={i}>{e}</li>)}
              </ul>
            </section>
          )}
        </div>
      )}

      {tab === 'topics' && (
        <div className="space-y-2">
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            Check topics as you complete them. Progress is saved automatically.
          </p>
          {phase.topics.map(topic => {
            const done = progress.completedTopics.includes(topic.id);
            return (
              <button
                key={topic.id}
                onClick={() => toggleTopic(topic.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-colors ${
                  done
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-[var(--card)] border-[var(--border)] hover:border-primary-400'
                }`}
              >
                {done ? (
                  <CheckCircle2 className="text-green-500 flex-shrink-0" size={20} />
                ) : (
                  <Circle className="text-[var(--text-secondary)] flex-shrink-0" size={20} />
                )}
                <span className={done ? 'line-through text-[var(--text-secondary)]' : ''}>
                  {topic.name}
                </span>
                {topic.mandatory && (
                  <span className="ml-auto text-xs bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 px-2 py-0.5 rounded">
                    Mandatory
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {tab === 'resources' && (
        <div className="space-y-4">
          {resources.length === 0 && (
            <p className="text-[var(--text-secondary)]">No specific resources linked for this phase in the data file. See Official Docs and Free Resources sections in Overview.</p>
          )}
          {resources.map(res => (
            <a
              key={res.id}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-medium">{res.title}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded ${res.cost === 'free' ? 'bg-green-500/20 text-green-600' : 'bg-amber-500/20 text-amber-600'}`}>
                      {res.cost.toUpperCase()}
                    </span>
                    {res.hasCertificate && (
                      <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-600">CERTIFICATE</span>
                    )}
                    {res.isMandatory && (
                      <span className="text-xs px-2 py-0.5 rounded bg-primary-500/20 text-primary-600">MANDATORY</span>
                    )}
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">{res.provider} · {res.type}</p>
                  <p className="text-sm mt-2">{res.description}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-1 italic">{res.whyRecommended}</p>
                </div>
                <ExternalLink size={16} className="flex-shrink-0 text-[var(--text-secondary)]" />
              </div>
            </a>
          ))}
          {phase.officialDocs.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Official Documentation</h3>
              {phase.officialDocs.map((url, i) => (
                <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="block text-primary-600 text-sm hover:underline mb-1">
                  {url}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {tab === 'projects' && (
        <div className="space-y-4">
          {phaseProjects.map(proj => {
            const done = progress.completedProjects.includes(proj.id);
            return (
              <div key={proj.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5">
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleProject(proj.id)}>
                    {done ? <CheckCircle2 className="text-green-500" size={22} /> : <Circle className="text-[var(--text-secondary)]" size={22} />}
                  </button>
                  <div className="flex-1">
                    <h3 className="font-bold">{proj.name}</h3>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{proj.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {proj.technologies.map(t => (
                        <span key={t} className="text-xs bg-[var(--border)] px-2 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                    {proj.checklist && (
                      <ul className="mt-3 space-y-1 text-sm">
                        {proj.checklist.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Circle size={12} className="text-[var(--text-secondary)]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'checkpoint' && (
        <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-6">
          <h2 className="font-bold text-lg">PASS THIS CHECKPOINT</h2>
          <p className="mt-2">{phase.checkpoint.description}</p>
          <ul className="mt-4 space-y-2">
            {phase.checkpoint.criteria.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <Circle size={16} className="text-[var(--text-secondary)]" />
                {c}
              </li>
            ))}
          </ul>
          <button
            onClick={() => toggleCheckpoint(phase.checkpoint.id)}
            className={`mt-6 px-4 py-2 rounded-lg text-sm font-medium ${
              progress.completedCheckpoints.includes(phase.checkpoint.id)
                ? 'bg-green-500 text-white'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {progress.completedCheckpoints.includes(phase.checkpoint.id)
              ? '✓ Checkpoint Passed'
              : 'Mark Checkpoint as Passed'}
          </button>
        </div>
      )}

      {tab === 'notes' && (
        <div className="text-[var(--text-secondary)]">
          <p>Use the global Notes page to create notes for this phase. Filter by phase there.</p>
          <Link to="/notes" className="text-primary-600 hover:underline">Go to Notes →</Link>
        </div>
      )}
    </div>
  );
}
