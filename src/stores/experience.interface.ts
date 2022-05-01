export interface ExperienceItem {
  companyName: string;
  position: string;
  startDate: string | null;
  isWorkingHere: boolean;
  endDate: string | null;
  summary: string;
  id: string;
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

// temp data
export const allWorks = [
  {
    companyName: 'XYZ Private Limted',
    position: 'SDE 1',
    startDate: '12/3/2019',
    isWorkingHere: true,
    endDate: '1/5/2022',
    summary: '',
    id: 'xyx',
  },
];
