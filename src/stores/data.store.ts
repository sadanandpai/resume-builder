import create from 'zustand';
import { intro, social, experience, skills, achievements, education } from 'src/stores/data';
import { arrayMoveImmutable } from 'array-move';

export const useIntro = create((set) => ({
  name: intro.name,
  role: intro.role,
  mobile: intro.mobile,
  email: intro.email,
  location: intro.location,
  photo: intro.photo,
  aboutTitle: intro.aboutTitle,
  aboutDescription: intro.aboutDescription,
  objectiveTitle: intro.objectiveTitle,
  objectiveDescription: intro.objectiveDescription,

  setField: (field: string, value: string) =>
    set((state: any) => {
      state[field] = value; // eslint-disable-line no-param-reassign
    }),
}));

export const useSocial = create((set) => ({
  linkedin: social.linkedin,
  github: social.github,
  hackerrank: social.hackerrank,
  hackerearth: social.hackerearth,
  codechef: social.codechef,
  codeforces: social.codeforces,
  twitter: social.twitter,
  leetcode: social.leetcode,
  devto: social.devto,
  medium: social.medium,
  hashnode: social.hashnode,
  wordpress: social.wordpress,
  squarespace: social.squarespace,
  behance: social.behance,
  dribbble: social.dribbble,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value; // eslint-disable-line no-param-reassign
    }),
}));

export const useExp = create((set) => ({
  title: experience.title,
  companies: experience.companies,
  relExpLabel: experience.relExpLabel,
  relExp: experience.relExp,
  totalExpLabel: experience.totalExpLabel,
  totalExp: experience.totalExp,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value; // eslint-disable-line no-param-reassign
    }),

  updateCompany: (index, field, value) =>
    set((state: any) => {
      const newCompnaies = [...state.companies];
      newCompnaies[index][field] = value;
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  addCompany: () =>
    set((state: any) => {
      const newCompnaies = [
        ...state.companies,
        {
          name: 'Company',
          role: 'Role',
          from: 'from',
          to: 'to',
          years: '1 year',
          description: '* Point 1\n* Point 2\n* Point 3',
        },
      ];
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  deleteCompany: (index: number) =>
    set((state: any) => {
      const newCompnaies = state.companies.filter((_, ind) => ind !== index);
      return {
        ...state,
        companies: newCompnaies,
      };
    }),

  changeOrder: ({ oldIndex, newIndex }) =>
    set((state: any) => ({
      ...state,
      companies: arrayMoveImmutable(state.companies, oldIndex, newIndex),
    })),
}));

export const useAchievements = create(() => ({
  keyProjects: achievements.keyProjects,
  certificates: achievements.certificates,
}));

export const useSkills = create((set) => ({
  languages: skills.languages,
  frameworks: skills.frameworks,
  libraries: skills.libraries,
  databases: skills.databases,
  technologies: skills.technologies,
  practices: skills.practices,
  tools: skills.tools,

  addSkill: (type: string, name = '', rating = 1) =>
    set((state: any) => {
      if (state[type].some((skill) => skill.name === '')) return;

      state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
      state[type].push({ name, rating }); // eslint-disable-line no-param-reassign
    }),

  updateSkill: (type: string, index: number, key: 'name' | 'rating', value: string | number) =>
    set((state: any) => {
      state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
      state[type][index][key] = value; // eslint-disable-line no-param-reassign
    }),

  deleteSkill: (type: string, index: number) =>
    set((state: any) => {
      state[type] = state[type].filter((_, ind) => index !== ind); // eslint-disable-line no-param-reassign
    }),

  changeOrder: (type: string, oldIndex: number, newIndex: number) =>
    set((state: any) => ({
      ...state,
      [type]: arrayMoveImmutable(state[type], oldIndex, newIndex),
    })),
}));

export const useEducation = create(() => ({
  education,
}));
