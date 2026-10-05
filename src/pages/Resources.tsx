import { useState, useMemo } from 'react';
import { resources } from '../data/resources';
import { ExternalLink } from 'lucide-react';

export default function Resources() {
  const [search, setSearch] = useState('');
  const [costFilter, setCostFilter] = useState<'all' | 'free' | 'paid'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filtered = useMemo(() => {
    return resources.filter(r => {
      if (costFilter !== 'all' && r.cost !== costFilter) return false;
      if (typeFilter !== 'all' && r.type !== typeFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.title.toLowerCase().includes(q) ||
          r.provider.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [search, costFilter, typeFilter]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Resource Library</h1>
        <p className="text-[var(--text-secondary)] mt-1">All verified free and paid resources from the roadmap.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search resources..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm"
        />
        <select
          value={costFilter}
          onChange={e => setCostFilter(e.target.value as any)}
          className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm"
        >
          <option value="all">All costs</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm"
        >
          <option value="all">All types</option>
          <option value="course">Course</option>
          <option value="youtube">YouTube</option>
          <option value="documentation">Documentation</option>
          <option value="certification">Certification</option>
          <option value="practice">Practice</option>
        </select>
      </div>

      <div className="text-sm text-[var(--text-secondary)]">{filtered.length} resources</div>

      <div className="space-y-3">
        {filtered.map(res => (
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
                  {res.hasCertificate && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-600">CERTIFICATE</span>}
                  {res.isMandatory && <span className="text-xs px-2 py-0.5 rounded bg-primary-500/20 text-primary-600">MANDATORY</span>}
                  {res.isRecommended && <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-600">RECOMMENDED</span>}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{res.provider} · {res.type} · {res.difficulty}</p>
                <p className="text-sm mt-2">{res.description}</p>
                <p className="text-sm text-[var(--text-secondary)] mt-1 italic">Why: {res.whyRecommended}</p>
                {res.price && <p className="text-sm mt-1">Price: {res.price}</p>}
              </div>
              <ExternalLink size={16} className="flex-shrink-0 text-[var(--text-secondary)]" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
