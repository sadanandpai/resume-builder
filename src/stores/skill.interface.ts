export interface Item {
  name: string;
  level: number;
}

export interface SkillState {
  title: string;
  hasLevel: boolean;
  values: Item[];
  add: ({ name, level }: { name: string; level: number }) => void;
  remove: (index: number) => void;
  set: (name: Item[]) => void;
}

// temporary data
export const languages = [
  { name: 'JavaScript', level: 60 },
  { name: 'HTML', level: 40 },
  { name: 'CSS', level: 80 },
];

export const frameworks = [
  { name: 'React', level: 60 },
  { name: 'Angular', level: 40 },
  { name: 'Vue', level: 80 },
];

export const libraries = [
  { name: 'NextJS', level: 3 },
  { name: 'Redux', level: 3 },
  { name: 'Bootstrap', level: 3 },
  { name: 'SCSS', level: 1 },
];

export const databases = [
  { name: 'Web Components', level: 3 },
  { name: 'NgRX', level: 3 },
  { name: 'PWA', level: 3 },
  { name: 'SQL', level: 3 },
];

export const technologies = [
  { name: 'Algorithms', level: 3 },
  { name: 'Data Structures', level: 3 },
  { name: 'TypeScript', level: 3 },
];

export const practices = [
  { name: 'Component based architecture', level: 3 },
  { name: 'MVC', level: 3 },
  { name: 'Agile methodology', level: 3 },
  { name: 'Mobile First Design', level: 3 },
  { name: 'Design Patterns', level: 3 },
  { name: 'RESTful architecture', level: 3 },
  { name: 'Test Driven Development', level: 3 },
];

export const tools = [
  { name: 'Git', level: 3 },
  { name: 'Jira', level: 3 },
  { name: 'Webpack', level: 3 },
  { name: 'VS Code', level: 3 },
  { name: 'Storybook', level: 3 },
  { name: 'Docker', level: 3 },
];
