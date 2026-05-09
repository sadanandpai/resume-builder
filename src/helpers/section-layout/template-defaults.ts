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
  minimal: {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills'] },
  },
  timeline: {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills'] },
  },
  compact: {
    regionKeys: ['left', 'right'],
    defaults: {
      left: ['summary', 'work'],
      right: ['skills_rated', 'tools', 'education'],
    },
  },
  executive: {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills'] },
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
  playful: {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills', 'awards'] },
  },
  artistic: {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['summary', 'work', 'education'], sidebar: ['skills'] },
  },
  inspired: {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['work', 'education'], sidebar: ['summary', 'skills'] },
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
  instinctive: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'skills'] },
  },
  elegant: {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['skills_key', 'tools'], main: ['work', 'education'] },
  },
  modernized: {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['work', 'education', 'awards'], sidebar: ['summary', 'skills'] },
  },
  sleek: {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['work', 'education'], sidebar: ['summary', 'contact_info', 'skills'] },
  },
  classy: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'skills'] },
  },
  distinguished: {
    regionKeys: ['main'],
    defaults: { main: ['work', 'education', 'skills'] },
  },
  expressive: {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['education', 'skills_merged', 'awards'], main: ['work'] },
  },
  'simple-ats': {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills_grid'] },
  },
  corporate: {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['skills_merged'], main: ['summary', 'work', 'education'] },
  },
  'split-header': {
    regionKeys: ['sidebar', 'main'],
    defaults: { sidebar: ['skills_rated', 'practices'], main: ['summary', 'work', 'education'] },
  },
  'precision-ats': {
    regionKeys: ['main'],
    defaults: { main: ['summary', 'work', 'education', 'skills_line'] },
  },
  'asymmetric-ats': {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['summary', 'work', 'education'], sidebar: ['skills_list'] },
  },
  balanced: {
    regionKeys: ['main', 'sidebar'],
    defaults: { main: ['summary', 'work', 'education'], sidebar: ['skills'] },
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
