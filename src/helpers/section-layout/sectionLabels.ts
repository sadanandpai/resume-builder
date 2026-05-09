const SECTION_LABELS: Record<string, string> = {
  summary: 'Summary',
  work: 'Experience',
  awards: 'Awards',
  objective: 'Objective',
  languages: 'Languages',
  technologies: 'Technologies',
  frameworks_libs: 'Frameworks & Libraries',
  tools: 'Tools',
  education: 'Education',
  volunteer: 'Volunteering',
  involvement: 'Involvement',
  involvements: 'Involvements',
  achievements: 'Achievements',
  tech_expertise: 'Tech Expertise',
  skills_exposure: 'Skills Exposure',
  methodology: 'Methodology',
  skills: 'Skills',
  projects: 'Projects',
  skills_rated: 'Skills',
  stack: 'Stack',
  skills_merged: 'Skills',
  skills_key: 'Key Skills',
  contact_info: 'Contact Info',
  practices: 'Practices',
  skills_grid: 'Skills',
  skills_line: 'Skills',
  skills_list: 'Skills',
};

function toTitleCase(value: string): string {
  return value
    .split('_')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getSectionDisplayName(sectionId: string): string {
  return SECTION_LABELS[sectionId] ?? toTitleCase(sectionId);
}
