import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

export function applyImportedResumeJson(uploadedResumeJSON: unknown): void {
  if (typeof uploadedResumeJSON !== 'object' || uploadedResumeJSON === null) {
    throw new Error('Resume JSON must be an object.');
  }

  const {
    basics = {},
    skills = {},
    work = [],
    education = [],
    activities = {
      involvements: '',
      achievements: '',
    },
    volunteer = [],
    awards = [],
  } = uploadedResumeJSON as Record<string, unknown>;

  const skillRecord =
    typeof skills === 'object' && skills !== null ? (skills as Record<string, unknown>) : {};

  const {
    languages = [],
    frameworks = [],
    libraries = [],
    databases = [],
    technologies = [],
    practices = [],
    tools = [],
  } = skillRecord;

  useBasicDetails.getState().reset(basics as never);
  useLanguages.getState().reset(languages as never);
  useFrameworks.getState().reset(frameworks as never);
  useLibraries.getState().reset(libraries as never);
  useDatabases.getState().reset(databases as never);
  useTechnologies.getState().reset(technologies as never);
  usePractices.getState().reset(practices as never);
  useTools.getState().reset(tools as never);
  useExperiences.getState().reset(work as never);
  useEducations.getState().reset(education as never);
  useVoluteeringStore.getState().reset(volunteer as never);
  useAwards.getState().reset(awards as never);
  useActivity.getState().reset(activities as never);
}
