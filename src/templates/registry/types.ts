import type { ComponentType } from 'react';

/** Declares column ids and default section order for drag-and-drop layout. */
export type TemplateSectionLayoutConfig = {
  regionKeys: string[];
  defaults: Record<string, string[]>;
};

/** One section id + when it should appear (must mirror SectionValidator “has content” in the template). */
export type TemplateSectionRule = {
  sectionId: string;

  when: (resumeData: any) => boolean;
};

/**
 * Single source of truth for a shipped resume template.
 * Add one object below in `templates.ts`, implement the React component, and you are done.
 */
export type TemplateRegistryEntry = {
  id: string;
  name: string;
  thumbnail: string;
  sectionLayout: TemplateSectionLayoutConfig;
  sectionRules: TemplateSectionRule[];
  loadComponent: () => Promise<{ default: ComponentType<unknown> }>;
};
