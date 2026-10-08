import { create } from 'zustand';

export interface EditorTarget {
  section: string;
  panel?: string;
}

export const previewEditorTargets: Record<string, EditorTarget> = {
  basics: { section: 'basic-details' },
  summary: { section: 'basic-details', panel: 'About' },
  objective: { section: 'basic-details', panel: 'About' },
  work: { section: 'experience' },
  education: { section: 'education' },
  awards: { section: 'awards' },
  volunteer: { section: 'volunteering' },
  involvement: { section: 'activities', panel: 'involvements' },
  involvements: { section: 'activities', panel: 'involvements' },
  projects: { section: 'activities', panel: 'involvements' },
  achievements: { section: 'activities', panel: 'achievements' },
  languages: { section: 'skills-and-expertise', panel: 'Languages' },
  technologies: { section: 'skills-and-expertise', panel: 'Technologies' },
  frameworks_libs: { section: 'skills-and-expertise', panel: 'Frameworks' },
  tools: { section: 'skills-and-expertise', panel: 'Tools' },
  tech_expertise: { section: 'skills-and-expertise', panel: 'Languages' },
  skills_exposure: { section: 'skills-and-expertise', panel: 'Technologies' },
  methodology: { section: 'skills-and-expertise', panel: 'Practices' },
  skills: { section: 'skills-and-expertise', panel: 'Languages' },
  skills_merged: { section: 'skills-and-expertise', panel: 'Languages' },
  stack: { section: 'skills-and-expertise', panel: 'Tools' },
};

export const useEditorStore = create<{
  target: EditorTarget;
  revision: number;
  openEditor: (target: EditorTarget) => void;
}>((set) => ({
  target: { section: '' },
  revision: 0,
  openEditor: (target) => set((state) => ({ target, revision: state.revision + 1 })),
}));
