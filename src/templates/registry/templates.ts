/**
 * -----------------------------------------------------------------------------
 * CONTRIBUTING: add a new resume template
 * -----------------------------------------------------------------------------
 * 1. Create `src/templates/<your-slug>/YourTemplate.tsx` (default export).
 * 2. Append one entry to `TEMPLATE_REGISTRY` below (copy an existing block).
 *    — Use `regionKeys` + `defaults` that match your `<SortableRegion regionId="…">` usage.
 *    — List every section id you render in `sectionRules` with the same “has content”
 *      logic as your `SectionValidator` / conditional rendering.
 * 3. Optional: add `public/templates/<slug>.png` and set `thumbnail`.
 *
 * -----------------------------------------------------------------------------
 */
import type { TemplateRegistryEntry } from './types';
import * as has from './predicates';

export const TEMPLATE_REGISTRY: Record<string, TemplateRegistryEntry> = {
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    sectionLayout: {
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
    sectionRules: [
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'awards', when: has.awards },
      { sectionId: 'objective', when: has.basicsObjective },
      { sectionId: 'languages', when: has.languages },
      { sectionId: 'technologies', when: has.technologies },
      { sectionId: 'frameworks_libs', when: has.frameworksLibs },
      { sectionId: 'tools', when: has.tools },
      { sectionId: 'education', when: has.education },
      { sectionId: 'volunteer', when: has.volunteer },
    ],
    loadComponent: () => import('@/templates/modern/MordernTemplate'),
  },

  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    sectionLayout: {
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
    sectionRules: [
      { sectionId: 'work', when: has.work },
      { sectionId: 'involvement', when: has.involvement },
      { sectionId: 'achievements', when: has.achievements },
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'objective', when: has.basicsObjective },
      { sectionId: 'tech_expertise', when: has.techExpertise },
      { sectionId: 'skills_exposure', when: has.skillsExposure },
      { sectionId: 'methodology', when: has.practices },
      { sectionId: 'tools', when: has.tools },
      { sectionId: 'education', when: has.education },
    ],
    loadComponent: () => import('@/templates/professional/ProfessionalTemplate'),
  },

  classic: {
    id: 'classic',
    name: 'Classic',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main'],
      defaults: { main: ['summary', 'work', 'education', 'skills'] },
    },
    sectionRules: [
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'education', when: has.education },
      { sectionId: 'skills', when: has.skillsLangFrameworks },
    ],
    loadComponent: () => import('@/templates/classic/ClassicTemplate'),
  },

  'sidebar-left': {
    id: 'sidebar-left',
    name: 'Sidebar Left',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['sidebar', 'main'],
      defaults: { sidebar: ['skills', 'education'], main: ['summary', 'work', 'awards'] },
    },
    sectionRules: [
      { sectionId: 'skills', when: has.skillsLangFrameworks },
      { sectionId: 'education', when: has.education },
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'awards', when: has.achievements },
    ],
    loadComponent: () => import('@/templates/sidebar-left/SidebarLeftTemplate'),
  },

  'sidebar-right': {
    id: 'sidebar-right',
    name: 'Sidebar Right',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main', 'sidebar'],
      defaults: { main: ['summary', 'work', 'projects'], sidebar: ['skills', 'education'] },
    },
    sectionRules: [
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'projects', when: has.involvement },
      { sectionId: 'skills', when: has.skillsLangFrameworks },
      { sectionId: 'education', when: has.education },
    ],
    loadComponent: () => import('@/templates/sidebar-right/SidebarRightTemplate'),
  },

  'header-band': {
    id: 'header-band',
    name: 'Header Band',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main', 'sidebar'],
      defaults: { main: ['summary', 'work'], sidebar: ['skills', 'tools', 'education'] },
    },
    sectionRules: [
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'skills', when: has.skillsLangFrameworks },
      { sectionId: 'tools', when: has.tools },
      { sectionId: 'education', when: has.education },
    ],
    loadComponent: () => import('@/templates/header-band/HeaderBandTemplate'),
  },

  creative: {
    id: 'creative',
    name: 'Creative',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['sidebar', 'main'],
      defaults: { sidebar: ['skills', 'education'], main: ['summary', 'work'] },
    },
    sectionRules: [
      { sectionId: 'skills', when: has.skillsLangFrameworks },
      { sectionId: 'education', when: has.education },
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
    ],
    loadComponent: () => import('@/templates/creative/CreativeTemplate'),
  },

  technical: {
    id: 'technical',
    name: 'Technical',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main', 'sidebar'],
      defaults: {
        main: ['summary', 'work', 'projects'],
        sidebar: ['languages', 'frameworks_libs', 'stack', 'education'],
      },
    },
    sectionRules: [
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'work', when: has.work },
      { sectionId: 'projects', when: has.involvement },
      { sectionId: 'languages', when: has.languages },
      { sectionId: 'frameworks_libs', when: has.frameworksLibs },
      { sectionId: 'stack', when: has.stackToolsDatabases },
      { sectionId: 'education', when: has.education },
    ],
    loadComponent: () => import('@/templates/technical/TechnicalTemplate'),
  },

  inspired: {
    id: 'inspired',
    name: 'Inspired',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main', 'sidebar'],
      defaults: { main: ['work', 'education'], sidebar: ['summary', 'skills'] },
    },
    sectionRules: [
      { sectionId: 'work', when: has.work },
      { sectionId: 'education', when: has.education },
      { sectionId: 'summary', when: has.basicsSummary },
      { sectionId: 'skills', when: has.skillsLangFrameworks },
    ],
    loadComponent: () => import('@/templates/inspired/InspiredTemplate'),
  },

  plain: {
    id: 'plain',
    name: 'Plain',
    thumbnail: '',
    sectionLayout: {
      regionKeys: ['main'],
      defaults: { main: ['work', 'education', 'awards'] },
    },
    sectionRules: [
      { sectionId: 'work', when: has.work },
      { sectionId: 'education', when: has.education },
      { sectionId: 'awards', when: has.awards },
    ],
    loadComponent: () => import('@/templates/plain/PlainTemplate'),
  },
};
