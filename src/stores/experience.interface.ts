export interface ExperienceItem {
  id: string;
  name: string;
  position: string;
  url: string;
  startDate: string | null;
  endDate: string | null;
  summary: string;
  highlights: string[];
  isWorkingHere?: boolean;
}

export interface ExperienceStore {
  experiences: ExperienceItem[];
  add: (newExperience: ExperienceItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  set: (values: ExperienceItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
}
