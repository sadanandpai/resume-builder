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

  changeCompanyOrder: ({ oldIndex, newIndex }) =>
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
  technical: skills.technical,
  exposure: skills.exposure,
  methodology: skills.methodology,
  tools: skills.tools,

  setTechnical: (items) =>
    set((state: any) => ({
      ...state,
      technical: {
        ...state.technical,
        items,
      },
    })),
}));

export const useEducation = create(() => ({
  education,
}));
