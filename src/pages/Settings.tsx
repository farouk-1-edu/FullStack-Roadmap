import { useProgress } from '../hooks/useProgress';

export default function Settings() {
  const { progress, setTheme, setWeeklyHoursGoal, resetProgress }= useProgress();
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-4">
        <div>
          <label className="text-sm font-medium">Theme</label>
          <div className="mt-2 flex gap-2">
            <button onClick={() => setTheme('light')} className={`px-3 py-1.5 rounded-lg text-sm ${progress.theme === 'light' ? 'bg-primary-600 text-white' : 'border border-[var(--border)]'}`}>Light</button>
            <button onClick={() => setTheme('dark')} className={`px-3 py-1.5 rounded-lg text-sm ${progress.theme === 'dark' ? 'bg-primary-600 text-white' : 'border border-[var(--border)]'}`}>Dark</button>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">Weekly hours goal</label>
          <input type="number" min={5} max={40} value={progress.weeklyHoursGoal}
            onChange={e => setWeeklyHoursGoal(Number(e.target.value))}
            className="ml-3 w-20 px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>
        <div>
          <button onClick={resetProgress} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">Reset All Progress</button>
        </div>
      </div>
      <div className="text-sm text-[var(--text-secondary)]">
        <p>All progress is stored in your browser localStorage.</p>
        <p className="mt-2">This application is the complete learning roadmap. Every phase, topic, resource, project, certification, and recommendation from the original roadmap is included.</p>
      </div>
    </div>
  );
}
