export interface EducationItem {
  academyName: string;
  degree: string;
  grade: string;
  startDate: string | null;
  isStudyingHere: boolean;
  endDate: string | null;
  id: string;
}

export interface EducationStore {
  academics: EducationItem[];
  add: (newEducation: EducationItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  set: (values: EducationItem[]) => void;
  onmoveup: (index: number) => void;
  onmovedown: (index: number) => void;
}

// temp data
export const allAcademics = [
  {
    academyName: 'MIT Univerisity',
    degree: 'CSE',
    grade: '50%',
    startDate: '12/3/2019',
    isStudyingHere: true,
    endDate: null,
    id: 'xyx',
  },
];
