import { certifications } from '../data/certifications';
import { useProgress } from '../hooks/useProgress';
import { CheckCircle2, Circle, ExternalLink, ArrowDown } from 'lucide-react';

export default function Certifications() {
  const { progress, toggleCertification } = useProgress();
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Certifications</h1>
        <p className="text-[var(--text-secondary)] mt-1">Recommended order. Only certifications that genuinely add value.</p>
      </div>
      <div className="space-y-0">
        {certifications.map((cert, i) => {
          const done = progress.completedCertifications.includes(cert.id);
          return (
            <div key={cert.id}>
              <div className={`bg-[var(--card)] border rounded-xl p-5 ${done ? 'border-green-500/50' : 'border-[var(--border)]'}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => toggleCertification(cert.id)}>
                    {done ? <CheckCircle2 className="text-green-500" size={22} /> : <Circle size={22} className="text-[var(--text-secondary)]" />}
                  </button>
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2 items-center">
                      <h2 className="font-bold">{cert.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded ${cert.careerValue === 'high' ? 'bg-green-500/20 text-green-600' : cert.careerValue === 'medium' ? 'bg-blue-500/20 text-blue-600' : 'bg-gray-500/20'}`}>
                        Career value: {cert.careerValue}
                      </span>
                      {cert.isOptional && <span className="text-xs px-2 py-0.5 rounded bg-gray-500/20">OPTIONAL</span>}
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{cert.provider} · {cert.difficulty} · {cert.cost}</p>
                    <p className="text-sm mt-2">{cert.description}</p>
                    <p className="text-sm mt-1"><strong>When:</strong> {cert.whenToTake}</p>
                    <p className="text-sm"><strong>Prep time:</strong> {cert.estimatedPrepTime}</p>
                    <a href={cert.officialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-primary-600 mt-2 hover:underline">
                      Official page <ExternalLink size={12} />
                    </a>
                  </div>
                </div>
              </div>
              {i < certifications.length - 1 && <div className="flex justify-center py-2"><ArrowDown size={18} className="text-[var(--text-secondary)]" /></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
