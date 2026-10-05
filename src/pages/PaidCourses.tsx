import { resources } from '../data/resources';
import { ExternalLink } from 'lucide-react';

export default function PaidCourses() {
  const paid = resources.filter(r => r.cost === 'paid');
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Paid Courses & Certifications</h1>
        <p className="text-[var(--text-secondary)] mt-1">Only reputable options. Certificates are marked honestly.</p>
      </div>
      <div className="space-y-3">
        {paid.map(res => (
          <a key={res.id} href={res.url} target="_blank" rel="noopener noreferrer"
            className="block bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-primary-500">
            <div className="flex justify-between gap-2">
              <div>
                <div className="flex gap-2 flex-wrap items-center">
                  <h3 className="font-medium">{res.title}</h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-600">PAID</span>
                  {res.hasCertificate && <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-600">CERTIFICATE</span>}
                  {res.isRecommended && <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-600">RECOMMENDED</span>}
                  {res.isOptional && <span className="text-xs px-2 py-0.5 rounded bg-gray-500/20">OPTIONAL</span>}
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1">{res.provider} · {res.difficulty}</p>
                <p className="text-sm mt-2">{res.description}</p>
                <p className="text-sm italic mt-1">{res.whyRecommended}</p>
                {res.price && <p className="text-sm mt-1 font-medium">Price: {res.price}</p>}
              </div>
              <ExternalLink size={16} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
