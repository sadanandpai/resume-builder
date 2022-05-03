import ResumeData from 'src/helpers/constants/resume-data.json';

import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import { useEducations } from './education';
import { useExperiences } from './experience';

export const useResumeStore = () => {
  return {
    ...ResumeData,
    work: useExperiences((state) => state.experiences),
    education: useEducations((state) => state.academics),
    skills: {
      languages: useLanguages((state) => state.get()),
      frameworks: useFrameworks((state) => state.get()),
      technologies: useTechnologies((state) => state.get()),
      libraries: useLibraries((state) => state.get()),
      databases: useDatabases((state) => state.get()),
      practices: usePractices((state) => state.get()),
      tools: useTools((state) => state.get()),
    },
  };
};
