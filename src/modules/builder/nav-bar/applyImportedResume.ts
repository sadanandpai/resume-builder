import { detachDraft } from '@/stores/resumeDraftStorage';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
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

import { applyResumeMetadata, normalizeResumeMetadata } from './resumeMetadata';

import { normalizeImportedResume } from './normalizeImportedResume';

export function applyImportedResumeJson(uploadedResumeJSON: unknown): void {
  // Validate every section before touching any persisted store.
  const { basics, skills, work, education, volunteer, awards, activities } =
    normalizeImportedResume(uploadedResumeJSON);
  const metadata = normalizeResumeMetadata(
    (uploadedResumeJSON as Record<string, unknown>).__metadata
  );
  detachDraft();
  useCloudResumeStore.getState().setId(null);
  useBasicDetails.getState().reset(basics);
  useLanguages.getState().reset(skills.languages);
  useFrameworks.getState().reset(skills.frameworks);
  useLibraries.getState().reset(skills.libraries);
  useDatabases.getState().reset(skills.databases);
  useTechnologies.getState().reset(skills.technologies);
  usePractices.getState().reset(skills.practices);
  useTools.getState().reset(skills.tools);
  useExperiences.getState().reset(work);
  useEducations.getState().reset(education);
  useVoluteeringStore.getState().reset(volunteer);
  useAwards.getState().reset(awards);
  useActivity.getState().reset(activities);
  if (metadata) applyResumeMetadata(metadata);
}
