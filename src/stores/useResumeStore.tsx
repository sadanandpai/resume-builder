import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import ResumeData from '@/helpers/constants/resume-data.json';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useActivity } from './activity';
import { useAwards } from './awards';
import { useBasicDetails } from './basic';
import { useEducations } from './education';
import { useExperiences } from './experience';
import { useVoluteeringStore } from './volunteering';
import { useMemo } from 'react';

export const useResumeStore = () => {
  const basics = useBasicDetails((state) => state.values);
  const work = useExperiences((state) => state.experiences);
  const education = useEducations((state) => state.academics);
  const awards = useAwards((state) => state.awards);
  const volunteer = useVoluteeringStore((state) => state.volunteeredExps);
  // Use each skill store's visibility-aware getter so hidden skills are
  // excluded from the resume preview as well as the editor.
  const languages = useLanguages((state) => state.get());
  const frameworks = useFrameworks((state) => state.get());
  const technologies = useTechnologies((state) => state.get());
  const libraries = useLibraries((state) => state.get());
  const databases = useDatabases((state) => state.get());
  const practices = usePractices((state) => state.get());
  const tools = useTools((state) => state.get());
  const activities = useActivity((state) => state.get());

  return useMemo(
    () => ({
      ...ResumeData,
      basics,
      work,
      education,
      awards,
      volunteer,
      skills: { languages, frameworks, technologies, libraries, databases, practices, tools },
      activities,
    }),
    [
      basics,
      work,
      education,
      awards,
      volunteer,
      languages,
      frameworks,
      technologies,
      libraries,
      databases,
      practices,
      tools,
      activities,
    ]
  );
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
  useSectionLayoutStore.getState().resetAll();
};
