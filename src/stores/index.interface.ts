import dayjs from 'dayjs';
export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface ProfileIntrf {
  network: string;
  username: string;
  url: string;
}

export interface BasicsIntrf {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  objective: string;
  location: Location;
  relExp: string;
  totalExp: string;
  profiles: ProfileIntrf[];
}

export interface ItemIntrf {
  name: string;
  level: number;
}

export interface SkillsIntrf {
  languages: ItemIntrf[];
  frameworks: ItemIntrf[];
  technologies: ItemIntrf[];
  libraries: ItemIntrf[];
  databases: ItemIntrf[];
  tools: ItemIntrf[];
  practices: ItemIntrf[];
}

export interface WorkIntrf {
  id: string;
  name: string;
  position: string;
  url: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  summary: string;
  highlights: string[];
  isWorkingHere: boolean;
  website: string;
}

export interface EducationIntrf {
  id: string;
  institution: string;
  url: string;
  studyType: string;
  area: string;
  startDate: dayjs.Dayjs;
  isStudyingHere: boolean;
  endDate: dayjs.Dayjs;
  score: string;
  courses: string[];
  website: string;
}

export interface ResumeIntrf {
  basics: BasicsIntrf;
  skills: SkillsIntrf;
  work: WorkIntrf[];
  education: EducationIntrf[];
}
