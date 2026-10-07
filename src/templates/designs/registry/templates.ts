/**
 * -----------------------------------------------------------------------------
 * CONTRIBUTING: add a new resume template
 * -----------------------------------------------------------------------------
 * 1. Create `src/templates/designs/<your-slug>/<Slug>Template.tsx` (default export).
 *    Select typed designs from `@/templates/components/<family>` through named imports.
 *    Keep data selection and page layout in the template; shared designs own section styling.
 *    Use `ResumePresentation` once and `TemplateRegion` for destination surface propagation.
 *    Add reusable designs to the shared collection, never template-local components/ or atoms/.
 * 2. If you introduce a new section id, add it to `sectionIds.ts` (`SECTION_IDS`).
 * 3. Append one entry to `TEMPLATE_REGISTRY` below (copy an existing block).
 *    — Use `REGION_IDS` + `SECTION_IDS` for every id string (avoids typos).
 *    — `sectionLayout` must match `<SortableRegion regionId={…}>` usage.
 *    — `sectionRules` must mirror the data passed to shared designs.
 * 4. Optional: add `public/templates/<slug>.png` and set `thumbnail`.
 *
 * -----------------------------------------------------------------------------
 */
import type { TemplateRegistryEntry } from './types';
import * as has from './predicates';
import { REGION_IDS, SECTION_IDS } from './sectionIds';

export const TEMPLATE_REGISTRY: Record<string, TemplateRegistryEntry> = {
  modern: {
    id: 'modern',
    name: 'Modern Resume',
    thumbnail: '/templates/modern.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.left, REGION_IDS.right],
      defaults: {
        [REGION_IDS.left]: [SECTION_IDS.summary, SECTION_IDS.work, SECTION_IDS.awards],
        [REGION_IDS.right]: [
          SECTION_IDS.objective,
          SECTION_IDS.languages,
          SECTION_IDS.technologies,
          SECTION_IDS.frameworksLibs,
          SECTION_IDS.tools,
          SECTION_IDS.education,
          SECTION_IDS.volunteer,
        ],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.awards, when: has.awards },
      { sectionId: SECTION_IDS.objective, when: has.basicsObjective },
      { sectionId: SECTION_IDS.languages, when: has.languages },
      { sectionId: SECTION_IDS.technologies, when: has.technologies },
      { sectionId: SECTION_IDS.frameworksLibs, when: has.frameworksLibs },
      { sectionId: SECTION_IDS.tools, when: has.tools },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.volunteer, when: has.volunteer },
    ],
    loadComponent: () => import('@/templates/designs/modern/ModernTemplate'),
  },

  professional: {
    id: 'professional',
    name: 'Professional Resume',
    thumbnail: '/templates/professional.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.left, REGION_IDS.right],
      defaults: {
        [REGION_IDS.left]: [SECTION_IDS.work, SECTION_IDS.involvement, SECTION_IDS.achievements],
        [REGION_IDS.right]: [
          SECTION_IDS.summary,
          SECTION_IDS.objective,
          SECTION_IDS.techExpertise,
          SECTION_IDS.skillsExposure,
          SECTION_IDS.methodology,
          SECTION_IDS.tools,
          SECTION_IDS.education,
        ],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.involvement, when: has.involvement },
      { sectionId: SECTION_IDS.achievements, when: has.achievements },
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.objective, when: has.basicsObjective },
      { sectionId: SECTION_IDS.techExpertise, when: has.techExpertise },
      { sectionId: SECTION_IDS.skillsExposure, when: has.skillsExposure },
      { sectionId: SECTION_IDS.methodology, when: has.practices },
      { sectionId: SECTION_IDS.tools, when: has.tools },
      { sectionId: SECTION_IDS.education, when: has.education },
    ],
    loadComponent: () => import('@/templates/designs/professional/ProfessionalTemplate'),
  },

  classic: {
    id: 'classic',
    name: 'Classic',
    thumbnail: '/templates/classic.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main],
      defaults: {
        [REGION_IDS.main]: [
          SECTION_IDS.summary,
          SECTION_IDS.work,
          SECTION_IDS.education,
          SECTION_IDS.skills,
        ],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.skills, when: has.skillsMerged },
    ],
    loadComponent: () => import('@/templates/designs/classic/ClassicTemplate'),
  },

  'sidebar-left': {
    id: 'sidebar-left',
    name: 'Sidebar Left',
    thumbnail: '/templates/sidebarleft.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.sidebar, REGION_IDS.main],
      defaults: {
        [REGION_IDS.sidebar]: [SECTION_IDS.skills, SECTION_IDS.education],
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work, SECTION_IDS.awards],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.skills, when: has.skillsLangFrameworks },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.awards, when: has.achievements },
    ],
    loadComponent: () => import('@/templates/designs/sidebar-left/SidebarLeftTemplate'),
  },

  'sidebar-right': {
    id: 'sidebar-right',
    name: 'Sidebar Right',
    thumbnail: '/templates/sidebarright.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main, REGION_IDS.sidebar],
      defaults: {
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work, SECTION_IDS.projects],
        [REGION_IDS.sidebar]: [SECTION_IDS.skills, SECTION_IDS.education],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.projects, when: has.involvement },
      { sectionId: SECTION_IDS.skills, when: has.skillsLangFrameworks },
      { sectionId: SECTION_IDS.education, when: has.education },
    ],
    loadComponent: () => import('@/templates/designs/sidebar-right/SidebarRightTemplate'),
  },

  'header-band': {
    id: 'header-band',
    name: 'Header Band',
    thumbnail: '/templates/headerband.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main, REGION_IDS.sidebar],
      defaults: {
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work],
        [REGION_IDS.sidebar]: [SECTION_IDS.skills, SECTION_IDS.tools, SECTION_IDS.education],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.skills, when: has.skillsLangFrameworks },
      { sectionId: SECTION_IDS.tools, when: has.tools },
      { sectionId: SECTION_IDS.education, when: has.education },
    ],
    loadComponent: () => import('@/templates/designs/header-band/HeaderBandTemplate'),
  },

  creative: {
    id: 'creative',
    name: 'Creative',
    thumbnail: '/templates/creative.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.sidebar, REGION_IDS.main],
      defaults: {
        [REGION_IDS.sidebar]: [SECTION_IDS.skills, SECTION_IDS.education],
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.skills, when: has.skillsLangFrameworks },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
    ],
    loadComponent: () => import('@/templates/designs/creative/CreativeTemplate'),
  },

  technical: {
    id: 'technical',
    name: 'Technical',
    thumbnail: '/templates/technical.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main, REGION_IDS.sidebar],
      defaults: {
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work, SECTION_IDS.projects],
        [REGION_IDS.sidebar]: [
          SECTION_IDS.languages,
          SECTION_IDS.frameworksLibs,
          SECTION_IDS.stack,
          SECTION_IDS.education,
        ],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.projects, when: has.involvement },
      { sectionId: SECTION_IDS.languages, when: has.languages },
      { sectionId: SECTION_IDS.frameworksLibs, when: has.frameworksLibs },
      { sectionId: SECTION_IDS.stack, when: has.stackToolsDatabases },
      { sectionId: SECTION_IDS.education, when: has.education },
    ],
    loadComponent: () => import('@/templates/designs/technical/TechnicalTemplate'),
  },

  inspired: {
    id: 'inspired',
    name: 'Inspired',
    thumbnail: '/templates/inspired.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main, REGION_IDS.sidebar],
      defaults: {
        [REGION_IDS.main]: [SECTION_IDS.work, SECTION_IDS.education],
        [REGION_IDS.sidebar]: [SECTION_IDS.summary, SECTION_IDS.skills],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.skills, when: has.skillsLangFrameworks },
    ],
    loadComponent: () => import('@/templates/designs/inspired/InspiredTemplate'),
  },

  plain: {
    id: 'plain',
    name: 'Plain',
    thumbnail: '/templates/plain.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.main],
      defaults: {
        [REGION_IDS.main]: [SECTION_IDS.work, SECTION_IDS.education, SECTION_IDS.awards],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.awards, when: has.awards },
    ],
    loadComponent: () => import('@/templates/designs/plain/PlainTemplate'),
  },

  straightforward: {
    id: 'straightforward',
    name: 'Straightforward',
    thumbnail: '/templates/straightforward.png',
    sectionLayout: {
      regionKeys: [REGION_IDS.sidebar, REGION_IDS.main],
      defaults: {
        [REGION_IDS.sidebar]: [SECTION_IDS.education, SECTION_IDS.skillsMerged, SECTION_IDS.awards],
        [REGION_IDS.main]: [SECTION_IDS.summary, SECTION_IDS.work, SECTION_IDS.involvements],
      },
    },
    sectionRules: [
      { sectionId: SECTION_IDS.education, when: has.education },
      { sectionId: SECTION_IDS.skillsMerged, when: has.skillsMerged },
      { sectionId: SECTION_IDS.awards, when: has.awards },
      { sectionId: SECTION_IDS.summary, when: has.basicsSummary },
      { sectionId: SECTION_IDS.work, when: has.work },
      { sectionId: SECTION_IDS.involvements, when: has.involvement },
    ],
    loadComponent: () => import('@/templates/designs/straightforward/StraightforwardTemplate'),
  },
};
