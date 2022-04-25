export interface ExperienceItem {
  companyName: string;
  position: string;
  startDate: string;
  isWorkingHere: boolean;
  endDate: string;
  summary: string;
}

export interface ExperienceStore {
  experiences: ExperienceItem[];
  add: ({
    companyName,
    position,
    startDate,
    isWorkingHere,
    endDate,
    summary,
  }: ExperienceItem) => void;
  remove: (index: number) => void;
  set: (values: ExperienceItem[]) => void;
}

// temp data
export const allWorks = [
  {
    companyName: 'XYZ Private Limted',
    position: 'SDE 1',
    startDate: '12/3/2019',
    isWorkingHere: false,
    endDate: '25/1/2022',
    summary: '',
  },
];
