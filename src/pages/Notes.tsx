import { useState } from 'react';
import { useProgress } from '../hooks/useProgress';
import { Trash2 } from 'lucide-react';

export default function Notes() {
  const { progress, addNote, deleteNote } = useProgress();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    addNote({ title: title.trim(), content: content.trim() });
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Notes</h1>
        <p className="text-[var(--text-secondary)] mt-1">Personal notes for topics, projects, and phases. Saved in localStorage.</p>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-3">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Note title"
          className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm" />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content..."
          rows={4} className="w-full px-3 py-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] text-sm" />
        <button onClick={handleAdd} className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm">Add Note</button>
      </div>
      <div className="space-y-3">
        {progress.notes.length === 0 && <p className="text-[var(--text-secondary)]">No notes yet.</p>}
        {progress.notes.map(note => (
          <div key={note.id} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <div className="flex justify-between">
              <h3 className="font-medium">{note.title}</h3>
              <button onClick={() => deleteNote(note.id)} className="text-red-500"><Trash2 size={16} /></button>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-2 whitespace-pre-wrap">{note.content}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-2">{new Date(note.updatedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
