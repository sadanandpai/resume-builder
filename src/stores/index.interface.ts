export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Basics {
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
  profiles: Profile[];
}

export interface Item {
  name: string;
  score: number;
}

export interface Skills {
  languages: Item[];
  frameworks: Item[];
  technologies: Item[];
  libraries: Item[];
  databases: Item[];
  tools: Item[];
  practices: Item[];
}

export interface Work {
  company: string;
  position: string;
  website: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
  years: string;
}

export interface Education {
  institution: string;
  website: string;
  studyType: string;
  area: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Resume {
  basics: Basics;
  skills: Skills;
  work: Work[];
  education: Education[];
}
