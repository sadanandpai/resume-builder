/** Per-template default section order by region. Region keys are stable within each template. */
export type TemplateSectionLayoutConfig = {
  regionKeys: string[];
  defaults: Record<string, string[]>;
};

export const TEMPLATE_SECTION_LAYOUTS: Record<string, TemplateSectionLayoutConfig> = {
  modern: {
    regionKeys: ['left', 'right'],
    defaults: {
      left: ['summary', 'work', 'awards'],
      right: [
        'objective',
        'languages',
        'technologies',
        'frameworks_libs',
        'tools',
        'education',
        'volunteer',
      ],
    },
  },
  professional: {
    regionKeys: ['left', 'right'],
    defaults: {
      left: ['work', 'involvement', 'achievements'],
      right: [
        'summary',
        'objective',
        'tech_expertise',
        'skills_exposure',
        'methodology',
        'tools',
        'education',
      ],
    },
  },
  classic: {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills'] },
  },
  'sidebar-left': {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['skills', 'education'], main: ['summary', 'work', 'awards'] },
  },
  'sidebar-right': {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['summary', 'work', 'projects'], sidebar: ['skills', 'education'] },
  },
  'header-band': {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['summary', 'work'], sidebar: ['skills', 'tools', 'education'] },
  },
  creative: {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['skills', 'education'], main: ['summary', 'work'] },
  },
  technical: {
    regionKeys: ['main', 'sidebar'],
    defaults: {
      main: ['summary', 'work', 'projects'],
      sidebar: ['languages', 'frameworks_libs', 'stack', 'education'],
    },
  },
  versatile: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'skills_merged', 'awards'] },
  },
  straightforward: {
    regionKeys: ['sidebar', 'main'],
    defaults: {
      sidebar: ['education', 'skills_merged', 'awards'],
      main: ['summary', 'work', 'involvements'],
    },
  },
  accessible: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'skills'] },
  },
  plain: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'awards'] },
  },
};

export function getTemplateSectionLayoutConfig(templateId: string): TemplateSectionLayoutConfig {
  return (
    TEMPLATE_SECTION_LAYOUTS[templateId] ?? {
      regionKeys: ['main'],
      defaults: { main: [] },
    }
  );
}
