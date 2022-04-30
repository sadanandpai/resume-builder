export interface ExperienceItem {
  companyName: string;
  position: string;
  startDate: string;
  isWorkingHere: boolean;
  endDate: string;
  summary: string;
  id: string;
  isEnabled: boolean;
}

export interface ExperienceStore {
  experiences: ExperienceItem[];
  add: (newExperience: ExperienceItem) => void;
  get: (index: number) => void;
  remove: (index: number) => void;
  set: (values: ExperienceItem[]) => void;
  setIsEnabled: (index: number, enabled: boolean) => void;
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
    isEnabled: true,
  },
];
