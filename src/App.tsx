import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MasterRoadmap from './pages/MasterRoadmap';
import PhaseDetail from './pages/PhaseDetail';
import Resources from './pages/Resources';
import YouTubeResources from './pages/YouTubeResources';
import PaidCourses from './pages/PaidCourses';
import Certifications from './pages/Certifications';
import Projects from './pages/Projects';
import WeeklySchedule from './pages/WeeklySchedule';
import JobPreparation from './pages/JobPreparation';
import ProgressTracker from './pages/ProgressTracker';
import Notes from './pages/Notes';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="roadmap" element={<MasterRoadmap />} />
          <Route path="phase/:phaseId" element={<PhaseDetail />} />
          <Route path="resources" element={<Resources />} />
          <Route path="youtube" element={<YouTubeResources />} />
          <Route path="paid" element={<PaidCourses />} />
          <Route path="certifications" element={<Certifications />} />
          <Route path="projects" element={<Projects />} />
          <Route path="schedule" element={<WeeklySchedule />} />
          <Route path="job-prep" element={<JobPreparation />} />
          <Route path="progress" element={<ProgressTracker />} />
          <Route path="notes" element={<Notes />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
