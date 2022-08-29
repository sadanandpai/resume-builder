export interface EducationItem {
  institution: string;
  url: string;
  studyType: string;
  area: string;
  startDate: string | null;
  isStudyingHere: boolean;
  endDate: string | null;
  score: string;
  courses: string[];
  id: string;
}

export interface EducationStore {
  academics: EducationItem[];
  add: (newEducation: EducationItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  reset: (values: EducationItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
  updateEducation: (index: number, updatedInfo: EducationItem) => void;
}
