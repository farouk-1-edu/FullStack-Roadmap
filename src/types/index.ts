export type ResourceType = 'course' | 'youtube' | 'documentation' | 'book' | 'certification' | 'practice' | 'project';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';
export type ResourceCost = 'free' | 'paid';
export type PhaseStatus = 'not-started' | 'in-progress' | 'completed';

export interface Topic {
  id: string;
  name: string;
  description?: string;
  mandatory: boolean;
}

export interface Resource {
  id: string;
  title: string;
  provider: string;
  type: ResourceType;
  cost: ResourceCost;
  hasCertificate: boolean;
  difficulty: Difficulty;
  phaseId: string;
  topicIds: string[];
  url: string;
  description: string;
  whyRecommended: string;
  isMandatory: boolean;
  isOptional: boolean;
  isRecommended?: boolean;
  price?: string;
}

export interface Project {
  id: string;
  name: string;
  phaseId: string;
  difficulty: Difficulty;
  description: string;
  technologies: string[];
  features: string[];
  databaseRequirements?: string;
  apiRequirements?: string;
  authenticationRequirements?: string;
  testingRequirements?: string;
  dockerRequirements?: string;
  cicdRequirements?: string;
  cloudRequirements?: string;
  monitoringRequirements?: string;
  securityRequirements?: string;
  deploymentRequirements?: string;
  githubRequirements?: string;
  readmeRequirements?: string;
  checklist: string[];
}

export interface Checkpoint {
  id: string;
  phaseId: string;
  description: string;
  criteria: string[];
}

export interface Phase {
  id: string;
  number: number;
  name: string;
  shortName: string;
  description: string;
  why: string;
  prerequisites: string[];
  estimatedWeeks: string;
  studyTimeHours: string;
  topics: Topic[];
  recommendedOrder: string[];
  learnThisNow: string[];
  skipThisForNow: string[];
  buildThis: string[];
  thenMoveTo: string;
  expectedSkills: string[];
  mandatoryResources: string[];
  optionalResources: string[];
  exercises: string[];
  projects: string[];
  checkpoint: Checkpoint;
  freeResources: string[];
  youtubeResources: string[];
  paidResources: string[];
  officialDocs: string[];
}

export interface Certification {
  id: string;
  name: string;
  provider: string;
  officialName: string;
  difficulty: Difficulty;
  estimatedPrepTime: string;
  cost: string;
  officialUrl: string;
  recommendedPhase: string;
  careerValue: 'low' | 'medium' | 'high';
  prerequisites: string[];
  isMandatory: boolean;
  isOptional: boolean;
  description: string;
  whenToTake: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  phaseId?: string;
  topicId?: string;
  projectId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudyTask {
  id: string;
  day: string;
  title: string;
  hours: number;
  completed: boolean;
  phaseId?: string;
}

export interface UserProgress {
  completedTopics: string[];
  completedProjects: string[];
  completedCertifications: string[];
  completedCheckpoints: string[];
  currentPhaseId: string;
  weeklyHoursGoal: number;
  weeklyHoursLogged: number;
  studyDays: string[];
  streak: number;
  lastStudyDate: string | null;
  theme: 'light' | 'dark';
  notes: Note[];
  weeklyTasks: StudyTask[];
}

export interface JobPrepSection {
  id: string;
  title: string;
  content: string[];
  checklist: string[];
}
