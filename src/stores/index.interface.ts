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
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  years: string;
}

export interface EducationIntrf {
  institution: string;
  website: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface ResumeIntrf {
  basics: BasicsIntrf;
  skills: SkillsIntrf;
  work: WorkIntrf[];
  education: EducationIntrf[];
}
