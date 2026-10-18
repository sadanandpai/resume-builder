import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { useActivity } from '@/stores/activity';
import { useAwards } from '@/stores/awards';
import { useBasicDetails } from '@/stores/basic';
import { useEducations } from '@/stores/education';
import { useExperiences } from '@/stores/experience';
import { useVoluteeringStore } from '@/stores/volunteering';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from '@/stores/skills';

import { normalizeResumeMetadata, type ResumeMetadata } from './resumeMetadata';

import { normalizeImportedResume } from './normalizeImportedResume';

// Lives here (not resumeMetadata.ts) so that file -- shared with the MCP
// server's resume validation -- never imports AVAILABLE_TEMPLATES, which
// pulls in next/dynamic and the template React components.
function applyResumeMetadata(metadata: ResumeMetadata): void {
  const id = metadata.template.id;
  const titles = useSectionTitleStore.getState();
  titles.resetTemplate(id);
  for (const [section, title] of Object.entries(metadata.titles))
    titles.setTitle(id, section, title);
  useSectionLayoutStore.getState().setLayout(id, metadata.layout);
  useThemes.setState(metadata.colors);
  useResumeStyleStore.getState().hydrate();
  useResumeStyleStore.getState().commit(metadata.styles);
  useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[id]);
}

export function applyImportedResumeJson(uploadedResumeJSON: unknown): void {
  // Validate every section before touching any persisted store.
  const { basics, skills, work, education, volunteer, awards, activities } =
    normalizeImportedResume(uploadedResumeJSON);
  const metadata = normalizeResumeMetadata(
    (uploadedResumeJSON as Record<string, unknown>).__metadata
  );
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
