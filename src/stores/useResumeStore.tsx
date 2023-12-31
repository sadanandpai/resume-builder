import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';

import ResumeData from 'src/helpers/constants/resume-data.json';
import { useActivity } from './activity';
import { useAwards } from './awards';
import { useBasicDetails } from './basic';
import { useEducations } from './education';
import { useExperiences } from './experience';
import { useVoluteeringStore } from './volunteering';

export const useResumeStore = () => {
  return {
    ...ResumeData,
    basics: useBasicDetails((state) => state.values),
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    awards: useAwards((state) => state.awards),
    volunteer: useVoluteeringStore((state) => state.volunteeredExps),
    skills: {
      languages: useLanguages((state) => state.get()),
      frameworks: useFrameworks((state) => state.get()),
      technologies: useTechnologies((state) => state.get()),
      libraries: useLibraries((state) => state.get()),
      databases: useDatabases((state) => state.get()),
      practices: usePractices((state) => state.get()),
      tools: useTools((state) => state.get()),
    },
    activities: useActivity((state) => state.get()),
  };
};

/**
 * @description Reset all the stores
 */
export const resetResumeStore = () => {
  useBasicDetails.getState().reset(ResumeData.basics);
  useLanguages.getState().reset(ResumeData.skills.languages);
  useFrameworks.getState().reset(ResumeData.skills.frameworks);
  useLibraries.getState().reset(ResumeData.skills.libraries);
  useDatabases.getState().reset(ResumeData.skills.databases);
  useTechnologies.getState().reset(ResumeData.skills.technologies);
  usePractices.getState().reset(ResumeData.skills.practices);
  useTools.getState().reset(ResumeData.skills.tools);
  useExperiences.getState().reset(ResumeData.work);
  useEducations.getState().reset(ResumeData.education);
  useVoluteeringStore.getState().reset(ResumeData.volunteer);
  useAwards.getState().reset(ResumeData.awards);
  useActivity.getState().reset(ResumeData.activities);
};

/**
 * @description update all the stores
 */
export const updateResumeStore = (eResumeData: any) => {
  const {
    basics = {
      location: {
        address: '',
        postalCode: '',
        city: '',
        countryCode: '',
        region: '',
      },
    },
    skills = {},
    work = [],
    education = [],
    activities = {
      involvements: '',
      achievements: '',
    },

    volunteer = [],
    awards = [],
  } = eResumeData;
  const {
    languages = [],
    frameworks = [],
    libraries = [],
    databases = [],
    technologies = [],
    practices = [],
    tools = [],
  } = skills;
  useBasicDetails.getState().reset(basics);
  useLanguages.getState().reset(languages);
  useFrameworks.getState().reset(frameworks);
  useLibraries.getState().reset(libraries);
  useDatabases.getState().reset(databases);
  useTechnologies.getState().reset(technologies);
  usePractices.getState().reset(practices);
  useTools.getState().reset(tools);
  useExperiences.getState().reset(work);
  useEducations.getState().reset(education);
  useVoluteeringStore.getState().reset(volunteer);
  useAwards.getState().reset(awards);
  useActivity.getState().reset(activities);
};
