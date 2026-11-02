import { AVAILABLE_TEMPLATES } from '@/helpers/constants';
import type { ResumeMetadata } from '@/helpers/resumeMetadata';
export { normalizeResumeMetadata } from '@/helpers/resumeMetadata';
export type { ResumeMetadata } from '@/helpers/resumeMetadata';
import { useTemplates } from '@/stores/useTemplate';
import { useThemes } from '@/stores/themes';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';

export function exportResumeMetadata(): ResumeMetadata {
  useSectionTitleStore.getState().hydrate();
  useResumeStyleStore.getState().hydrate();
  const { id, name } = useTemplates.getState().activeTemplate;
  const { selectedTheme, customTheme } = useThemes.getState();
  return {
    version: 1,
    template: { id, name },
    titles: useSectionTitleStore.getState().titles[id] ?? {},
    layout: useSectionLayoutStore.getState().layouts[id] ?? {},
    colors: { selectedTheme, customTheme },
    styles: useResumeStyleStore.getState().settings,
  };
}

export function applyResumeMetadata(metadata: ResumeMetadata): void {
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
