import { resources } from '../data/resources';
import { ExternalLink } from 'lucide-react';

export default function YouTubeResources() {
  const yt = resources.filter(r => r.type === 'youtube');
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">YouTube Resources</h1>
        <p className="text-[var(--text-secondary)] mt-1">High-quality YouTube courses only (primarily freeCodeCamp).</p>
      </div>
      <div className="space-y-3">
        {yt.map(res => (
          <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer"
            className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">{res.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{res.provider}</p>
                <p className="text-sm mt-2">{res.description}</p>
              </div>
              <ExternalLink size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
