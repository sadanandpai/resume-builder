import create from 'zustand';
import {
  intro,
  social,
  work,
  skills,
  activities,
  education,
  volunteer,
  awards,
} from 'src/stores/data';
import { arrayMoveImmutable } from 'array-move';
import { persist } from 'zustand/middleware';
import produce from 'immer';

const labels = [
  'Experience',
  'Key Projects / Involvements',
  'Certificates and Awards',
  'About me',
  'Career Objective',
  'Technical Expertise',
  'Skills / Expsoure',
  'Methodology / Approach',
  'Tools',
  'Education',
  'Relevant Experience',
  'Total Experience',
];

export const useIntro = create(
  persist(
    (set) => ({
      name: intro.name,
      label: intro.label,
      phone: intro.phone,
      email: intro.email,
      url: intro.url,
      location: intro.location,
      image: intro.image,
      summary: intro.summary,
      objective: intro.objective,
      relExp: intro.relExp,
      totalExp: intro.totalExp,

      update: (type: string, value: string) =>
        set((state: any) => {
          state[type] = value; // eslint-disable-line no-param-reassign
        }),
    }),
    {
      name: 'sprb-intro',
    }
  )
);

export const useSocial = create(
  persist(
    (set) => ({
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

      update: (type: string, value: string) =>
        set((state: any) => {
          state[type] = value; // eslint-disable-line no-param-reassign
        }),
    }),
    {
      name: 'sprb-social',
    }
  )
);

export const useWork = create(
  persist(
    (set) => ({
      companies: work,

      setField: (event: InputEvent) =>
        set((state: any) => {
          const field = (<HTMLElement>event.target).dataset.label;

          if (field === undefined) return;
          state[field] = (<HTMLInputElement>event.target)?.value; // eslint-disable-line no-param-reassign
        }),

      add: () =>
        set((state: any) => ({
          companies: [
            ...state.companies,
            {
              name: 'Company',
              role: '',
              from: '',
              to: '',
              years: '',
              description: '* Point 1\n* Point 2\n* Point 3',
            },
          ],
        })),

      update: (index, field, value) =>
        set((state: any) => {
          const newCompnaies = [...state.companies];
          newCompnaies[index][field] = value;
          return {
            companies: newCompnaies,
          };
        }),

      purge: (index: number) =>
        set((state: any) => ({
          companies: state.companies.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          companies: arrayMoveImmutable(state.companies, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-work',
    }
  )
);

export const useSkills = create(
  persist(
    (set) => ({
      languages: skills.languages,
      frameworks: skills.frameworks,
      libraries: skills.libraries,
      databases: skills.databases,
      technologies: skills.technologies,
      practices: skills.practices,
      tools: skills.tools,

      add: (type: string, name = '', rating = 1) =>
        set((state: any) => {
          if (state[type].some((skill) => skill.name === '')) return;

          state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
          state[type].push({ name, rating }); // eslint-disable-line no-param-reassign
        }),

      update: (type: string, index: number, key: 'name' | 'rating', value: string | number) =>
        set((state: any) => {
          state[type] = [...state[type]]; // eslint-disable-line no-param-reassign
          state[type][index][key] = value; // eslint-disable-line no-param-reassign
        }),

      purge: (type: string, index: number) =>
        set((state: any) => {
          state[type] = state[type].filter((_, ind) => index !== ind); // eslint-disable-line no-param-reassign
        }),

      changeOrder: (type: string, oldIndex: number, newIndex: number) =>
        set((state: any) => ({
          ...state,
          [type]: arrayMoveImmutable(state[type], oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-skills',
    }
  )
);

export const useEducation = create(
  persist(
    (set) => ({
      education,

      add: () =>
        set((state: any) => ({
          education: [
            ...state.education,
            {
              institution: '',
              url: '',
              studyType: 'Degree',
              area: '',
              startDate: '',
              endDate: '',
              score: '',
              courses: [],
            },
          ],
        })),

      update: (index, field, value) =>
        set((state: any) => {
          const newEducation = [...state.education];
          newEducation[index][field] = value;
          return {
            education: newEducation,
          };
        }),

      purge: (index: number) =>
        set((state: any) => ({ education: state.education.filter((_, ind) => ind !== index) })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          education: arrayMoveImmutable(state.education, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-education',
    }
  )
);

export const useActivities = create(
  persist(
    (set) => ({
      involvements: activities.involvements,
      achievements: activities.achievements,

      update: (type: string, value: string | number) =>
        set((state: any) => {
          state[type] = value; // eslint-disable-line no-param-reassign
        }),
    }),
    {
      name: 'sprb-activities',
    }
  )
);

export const useVolunteer = create(
  persist(
    (set) => ({
      volunteer,

      add: () =>
        set(
          produce((state: any) => {
            state.volunteer.push({
              organization: 'Organization',
              position: 'Volunteer',
              url: '',
              startDate: '',
              endDate: '',
              summary: '',
              highlights: '',
            });
          })
        ),

      update: (index: string, key: string, value: string) =>
        set(
          produce((state: any) => {
            state.volunteer[index][key] = value; // eslint-disable-line no-param-reassign
          })
        ),

      purge: (index: number) =>
        set((state: any) => ({
          volunteer: state.volunteer.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          volunteer: arrayMoveImmutable(state.volunteer, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-volunteer',
    }
  )
);

export const useAwards = create(
  persist(
    (set) => ({
      awards,

      add: () =>
        set(
          produce((state: any) => {
            state.awards.push({
              title: 'Award X',
              date: '',
              awarder: '',
              summary: '',
            });
          })
        ),

      update: (index: string, key: string, value: string) =>
        set(
          produce((state: any) => {
            state.awards[index][key] = value; // eslint-disable-line no-param-reassign
          })
        ),

      purge: (index: number) =>
        set((state: any) => ({
          awards: state.awards.filter((_, ind) => ind !== index),
        })),

      changeOrder: ({ oldIndex, newIndex }) =>
        set((state: any) => ({
          awards: arrayMoveImmutable(state.awards, oldIndex, newIndex),
        })),
    }),
    {
      name: 'sprb-awards',
    }
  )
);

export const useLabels = create(
  persist(
    (set) => ({
      labels,

      update: (index: number, value: string) =>
        set((state: any) => {
          const newlabels = [...state.labels];
          newlabels[index] = value;
          return {
            labels: newlabels,
          };
        }),
    }),
    {
      name: 'sprb-labels',
    }
  )
);
