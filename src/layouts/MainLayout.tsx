import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  BookOpen,
  Youtube,
  CreditCard,
  Award,
  FolderKanban,
  Calendar,
  Briefcase,
  BarChart3,
  StickyNote,
  Settings,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/roadmap', icon: Map, label: 'Master Roadmap' },
  { to: '/resources', icon: BookOpen, label: 'Resources' },
  { to: '/youtube', icon: Youtube, label: 'YouTube' },
  { to: '/paid', icon: CreditCard, label: 'Paid Courses' },
  { to: '/certifications', icon: Award, label: 'Certifications' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
  { to: '/schedule', icon: Calendar, label: 'Weekly Schedule' },
  { to: '/job-prep', icon: Briefcase, label: 'Job Preparation' },
  { to: '/progress', icon: BarChart3, label: 'Progress Tracker' },
  { to: '/notes', icon: StickyNote, label: 'Notes' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { progress, setTheme, overallProgress } = useProgress();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[var(--bg-secondary)] border-r border-[var(--border)] transform transition-transform duration-200 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div>
              <h1 className="font-bold text-lg">Learning Roadmap</h1>
              <p className="text-xs text-[var(--text-secondary)]">Software Engineer Path</p>
            </div>
            <button
              className="lg:hidden p-1"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4 py-3 border-b border-[var(--border)]">
            <div className="text-xs text-[var(--text-secondary)] mb-1">Overall Progress</div>
            <div className="w-full bg-[var(--border)] rounded-full h-2">
              <div
                className="bg-primary-600 h-2 rounded-full transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <div className="text-sm font-medium mt-1">{overallProgress}%</div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text)]'
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-[var(--border)]">
            <button
              onClick={() => setTheme(progress.theme === 'dark' ? 'light' : 'dark')}
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--border)]"
              aria-label="Toggle theme"
            >
              {progress.theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              {progress.theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-[var(--bg)] border-b border-[var(--border)] px-4 py-3 flex items-center gap-4">
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-[var(--border)]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="text-sm text-[var(--text-secondary)] hidden sm:block">
            Current: <span className="font-medium text-[var(--text)]">{progress.currentPhaseId.replace('phase-', 'Phase ')}</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
