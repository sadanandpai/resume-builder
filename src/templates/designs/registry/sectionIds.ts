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

export const SECTION_IDS = {
  volunteer: 'volunteer',
  summary: 'summary',
  work: 'work',
  awards: 'awards',
  objective: 'objective',
  frameworks: 'frameworks',
  tools: 'tools',
  education: 'education',
  involvement: 'involvement',
  achievements: 'achievements',
  techExpertise: 'tech_expertise',
  skillsExposure: 'skills_exposure',
  methodology: 'methodology',
  skills: 'skills',
} as const;
