import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, Note, StudyTask } from '../types';
import { phases } from '../data/phases';
import { projects } from '../data/projects';
import { certifications } from '../data/certifications';

const STORAGE_KEY = 'learning-roadmap-progress';

const defaultProgress: UserProgress = {
  completedTopics: [],
  completedProjects: [],
  completedCertifications: [],
  completedCheckpoints: [],
  currentPhaseId: 'phase-0',
  weeklyHoursGoal: 12,
  weeklyHoursLogged: 0,
  studyDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  streak: 0,
  lastStudyDate: null,
  theme: 'light',
  notes: [],
  weeklyTasks: [],
};

function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return { ...defaultProgress, ...JSON.parse(raw) };
    }
  } catch {
    // ignore
  }
  return defaultProgress;
}

function saveProgress(progress: UserProgress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', progress.theme === 'dark');
  }, [progress.theme]);

  const toggleTopic = useCallback((topicId: string) => {
    setProgress(prev => {
      const exists = prev.completedTopics.includes(topicId);
      return {
        ...prev,
        completedTopics: exists
          ? prev.completedTopics.filter(id => id !== topicId)
          : [...prev.completedTopics, topicId],
      };
    });
  }, []);

  const toggleProject = useCallback((projectId: string) => {
    setProgress(prev => {
      const exists = prev.completedProjects.includes(projectId);
      return {
        ...prev,
        completedProjects: exists
          ? prev.completedProjects.filter(id => id !== projectId)
          : [...prev.completedProjects, projectId],
      };
    });
  }, []);

  const toggleCertification = useCallback((certId: string) => {
    setProgress(prev => {
      const exists = prev.completedCertifications.includes(certId);
      return {
        ...prev,
        completedCertifications: exists
          ? prev.completedCertifications.filter(id => id !== certId)
          : [...prev.completedCertifications, certId],
      };
    });
  }, []);

  const toggleCheckpoint = useCallback((checkpointId: string) => {
    setProgress(prev => {
      const exists = prev.completedCheckpoints.includes(checkpointId);
      return {
        ...prev,
        completedCheckpoints: exists
          ? prev.completedCheckpoints.filter(id => id !== checkpointId)
          : [...prev.completedCheckpoints, checkpointId],
      };
    });
  }, []);

  const setCurrentPhase = useCallback((phaseId: string) => {
    setProgress(prev => ({ ...prev, currentPhaseId: phaseId }));
  }, []);

  const setTheme = useCallback((theme: 'light' | 'dark') => {
    setProgress(prev => ({ ...prev, theme }));
  }, []);

  const setWeeklyHoursGoal = useCallback((hours: number) => {
    setProgress(prev => ({ ...prev, weeklyHoursGoal: hours }));
  }, []);

  const logHours = useCallback((hours: number) => {
    setProgress(prev => ({
      ...prev,
      weeklyHoursLogged: prev.weeklyHoursLogged + hours,
      lastStudyDate: new Date().toISOString().split('T')[0],
      streak: prev.streak + 1,
    }));
  }, []);

  const addNote = useCallback((note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newNote: Note = {
      ...note,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    setProgress(prev => ({ ...prev, notes: [...prev.notes, newNote] }));
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setProgress(prev => ({
      ...prev,
      notes: prev.notes.map(n =>
        n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
      ),
    }));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setProgress(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== id),
    }));
  }, []);

  const setWeeklyTasks = useCallback((tasks: StudyTask[]) => {
    setProgress(prev => ({ ...prev, weeklyTasks: tasks }));
  }, []);

  const toggleWeeklyTask = useCallback((taskId: string) => {
    setProgress(prev => ({
      ...prev,
      weeklyTasks: prev.weeklyTasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      ),
    }));
  }, []);

  const resetProgress = useCallback(() => {
    if (confirm('Reset all progress? This cannot be undone.')) {
      setProgress(defaultProgress);
    }
  }, []);

  // Calculated stats
  const totalTopics = phases.reduce((sum, p) => sum + p.topics.length, 0);
  const completedTopicsCount = progress.completedTopics.length;
  const overallProgress = totalTopics > 0 ? Math.round((completedTopicsCount / totalTopics) * 100) : 0;

  const phaseProgress = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    if (!phase) return 0;
    const completed = phase.topics.filter(t => progress.completedTopics.includes(t.id)).length;
    return phase.topics.length > 0 ? Math.round((completed / phase.topics.length) * 100) : 0;
  };

  const currentPhase = phases.find(p => p.id === progress.currentPhaseId) || phases[0];

  return {
    progress,
    toggleTopic,
    toggleProject,
    toggleCertification,
    toggleCheckpoint,
    setCurrentPhase,
    setTheme,
    setWeeklyHoursGoal,
    logHours,
    addNote,
    updateNote,
    deleteNote,
    setWeeklyTasks,
    toggleWeeklyTask,
    resetProgress,
    overallProgress,
    phaseProgress,
    currentPhase,
    totalTopics,
    completedTopicsCount,
    totalProjects: projects.length,
    completedProjectsCount: progress.completedProjects.length,
    totalCertifications: certifications.length,
    completedCertificationsCount: progress.completedCertifications.length,
  };
}
