/**
 * Canonical section and region string ids. Use these in the template registry and in
 * template `switch (sectionId)` branches so typos are caught by TypeScript.
 *
 * Add a new entry here when introducing a section id that did not exist before.
 */
export const REGION_IDS = {
  left: 'left',
  right: 'right',
  main: 'main',
  sidebar: 'sidebar',
} as const;

export type RegionId = (typeof REGION_IDS)[keyof typeof REGION_IDS];

export const SECTION_IDS = {
  summary: 'summary',
  work: 'work',
  awards: 'awards',
  objective: 'objective',
  languages: 'languages',
  technologies: 'technologies',
  frameworksLibs: 'frameworks_libs',
  tools: 'tools',
  education: 'education',
  volunteer: 'volunteer',
  involvement: 'involvement',
  achievements: 'achievements',
  techExpertise: 'tech_expertise',
  skillsExposure: 'skills_exposure',
  methodology: 'methodology',
  skills: 'skills',
  projects: 'projects',
  stack: 'stack',
  skillsMerged: 'skills_merged',
  involvements: 'involvements',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];
