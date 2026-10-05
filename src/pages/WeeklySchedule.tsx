import { useProgress } from '../hooks/useProgress';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function WeeklySchedule() {
  const { progress, setWeeklyHoursGoal, logHours }= useProgress();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Weekly Schedule</h1>
        <p className="text-[var(--text-secondary)] mt-1">Assume 10–15 hours per week. Track your study.</p>
      </div>
      <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-5 space-y-4">
        <div>
          <label className="text-sm font-medium">Weekly hours goal</label>
          <input type="number" min={5} max={40} value={progress.weeklyHoursGoal}
            onChange={e => setWeeklyHoursGoal(Number(e.target.value))}
            className="ml-3 w-20 px-2 py-1 rounded border border-[var(--border)] bg-[var(--bg)]" />
        </div>
        <div>
          <div className="text-sm">Logged this week: <strong>{progress.weeklyHoursLogged}</strong> / {progress.weeklyHoursGoal} hours</div>
          <button onClick={() => logHours(1)} className="mt-2 px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg">+1 hour</button>
          <button onClick={() => logHours(2)} className="mt-2 ml-2 px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg">+2 hours</button>
        </div>
      </div>
      <div className="grid gap-3">
        {days.map(day => (
          <div key={day} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4">
            <h3 className="font-medium">{day}</h3>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Theory 30–40% · Coding practice 30–40% · Projects 20–30% · Review + English 10%
            </p>
          </div>
        ))}
      </div>
      <div className="text-sm text-[var(--text-secondary)]">
        <p><strong>Daily structure example:</strong> 1–1.5 h focused sessions (pomodoro), 5–6 days/week.</p>
        <p className="mt-2"><strong>Estimated total timeline:</strong> 20–30 months at consistent 10–15 h/week to job-ready junior level.</p>
      </div>
    </div>
  );
}
