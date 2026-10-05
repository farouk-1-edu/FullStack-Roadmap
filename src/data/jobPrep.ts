import type { JobPrepSection } from '../types';

export const jobPrepSections: JobPrepSection[] = [
  {
    id: 'jp-github',
    title: 'GitHub Portfolio',
    content: [
      'Keep repositories clean and professional.',
      'Pin your best 4–6 projects.',
      'Every project must have a high-quality README with description, tech stack, live demo, setup instructions, architecture notes.',
      'Meaningful commit history.',
      'Use topics/tags.',
    ],
    checklist: [
      'Profile README created',
      'Best projects pinned',
      'All major projects have excellent READMEs',
      'Live demos linked',
      'Consistent naming and structure',
    ],
  },
  {
    id: 'jp-cv',
    title: 'CV / Resume',
    content: [
      '1 page preferred for juniors.',
      'Projects first, then experience/education.',
      'Quantify achievements where possible.',
      'Tailor slightly for each application.',
      'Include links to GitHub, LinkedIn, portfolio, live demos.',
    ],
    checklist: [
      'One-page clean CV',
      'Projects section prominent',
      'Links to all key profiles',
      'No spelling/grammar errors',
      'PDF version ready',
    ],
  },
  {
    id: 'jp-linkedin',
    title: 'LinkedIn',
    content: [
      'Complete profile with professional photo.',
      'Headline focused on your target role (e.g., Junior Full Stack Developer | React + Node + TypeScript).',
      'About section telling your story and stack.',
      'Featured section with projects.',
      'Skills endorsed, open to work if appropriate.',
    ],
    checklist: [
      'Professional photo',
      'Strong headline',
      'About section written',
      'Projects featured',
      'Skills listed',
      'Open to work (optional)',
    ],
  },
  {
    id: 'jp-portfolio',
    title: 'Portfolio Website',
    content: [
      'Your own React + TypeScript site.',
      'Showcase projects with case studies.',
      'About, skills, contact.',
      'Fast, accessible, responsive, dark mode preferred.',
    ],
    checklist: [
      'Live portfolio site',
      'Projects with descriptions and links',
      'Contact method',
      'Mobile friendly',
    ],
  },
  {
    id: 'jp-internships',
    title: 'When to Start Applying for Internships',
    content: [
      'After Phase 6 + 2–3 solid deployed projects (roughly month 12–18 depending on pace).',
      'You should be able to explain your code and architecture decisions.',
    ],
    checklist: [
      'At least 2–3 deployed full-stack projects',
      'Clean GitHub',
      'Basic CV and LinkedIn ready',
      'Able to talk about your projects confidently',
    ],
  },
  {
    id: 'jp-junior',
    title: 'Junior Jobs',
    content: [
      'After Phase 8–10 + polished portfolio.',
      'Target companies that hire juniors and value projects over pure years of experience.',
    ],
    checklist: [
      'Capstone projects complete',
      'Portfolio polished',
      'Interview preparation started',
    ],
  },
  {
    id: 'jp-dsa',
    title: 'DSA Interview Preparation',
    content: [
      'Focus on Easy and Medium problems relevant to your stack.',
      'Arrays, strings, hash maps, linked lists, trees, basic graphs, sorting, searching, two pointers, sliding window.',
      'Practice explaining solutions out loud.',
      'LeetCode, freeCodeCamp algorithms, or similar.',
    ],
    checklist: [
      'Solved 50+ Easy problems',
      'Solved 20–30 Medium problems',
      'Can explain Big O of solutions',
      'Practiced verbal explanation',
    ],
  },
  {
    id: 'jp-backend',
    title: 'Backend Interview Questions',
    content: [
      'REST vs GraphQL, authentication (JWT, sessions, OAuth), authorization, validation, error handling, caching, database design, indexes, transactions, N+1, security best practices, scaling basics.',
    ],
    checklist: [
      'Can design a simple REST API on a whiteboard',
      'Explain JWT flow',
      'Explain database indexing',
      'Discuss security concerns in APIs',
    ],
  },
  {
    id: 'jp-system-design',
    title: 'System Design',
    content: [
      'High-level only for junior level.',
      'Focus on simple systems: URL shortener, todo app at scale, basic chat, notification system.',
      'Talk about components, data flow, bottlenecks, caching, databases.',
    ],
    checklist: [
      'Studied high-level system design primer sections',
      'Practiced 3–5 simple designs',
      'Can draw and explain components',
    ],
  },
  {
    id: 'jp-sql',
    title: 'SQL Interviews',
    content: [
      'Joins, aggregations, subqueries, window functions basics, indexes, normalization, transactions, explain plans at a high level.',
    ],
    checklist: [
      'Comfortable with complex joins',
      'Can write queries for common interview scenarios',
      'Understand indexes and when to use them',
    ],
  },
  {
    id: 'jp-js-ts',
    title: 'JavaScript / TypeScript Interviews',
    content: [
      'Closures, event loop, promises, async/await, this, prototypes, ES6+ features, TypeScript types, interfaces, generics, utility types, common pitfalls.',
    ],
    checklist: [
      'Can explain closures and event loop clearly',
      'Comfortable with TypeScript in interviews',
      'Know common JS gotchas',
    ],
  },
  {
    id: 'jp-cloud',
    title: 'Cloud Questions',
    content: [
      'Core AWS services you used, IAM best practices, VPC basics, high availability concepts, cost awareness, security shared responsibility model.',
    ],
    checklist: [
      'Can explain architecture of your deployed projects',
      'Understand IAM and least privilege',
      'Know when to use managed services',
    ],
  },
  {
    id: 'jp-devops',
    title: 'DevOps Questions',
    content: [
      'Docker basics, CI/CD pipeline explanation, why containers, basic monitoring, GitHub Actions workflows.',
    ],
    checklist: [
      'Can explain your CI/CD pipeline',
      'Understand Docker multi-stage builds',
      'Know basic monitoring concepts',
    ],
  },
  {
    id: 'jp-behavioral',
    title: 'Behavioral Interviews',
    content: [
      'Use STAR method (Situation, Task, Action, Result).',
      'Prepare stories about challenges, teamwork, learning, failure, conflict, leadership (even small).',
      'Be honest and specific.',
    ],
    checklist: [
      'Prepared 5–7 STAR stories',
      'Practiced out loud',
      'Can talk about your learning journey and projects',
    ],
  },
  {
    id: 'jp-freelance',
    title: 'Freelancing Preparation',
    content: [
      'After 2–3 strong projects you can start small freelance work for experience.',
      'Platforms like Upwork, local networks, or open-source contributions.',
      'Focus on clear communication, scope definition, and delivery.',
    ],
    checklist: [
      '2–3 strong portfolio projects ready',
      'Clear service offering defined',
      'Communication templates ready',
    ],
  },
];
