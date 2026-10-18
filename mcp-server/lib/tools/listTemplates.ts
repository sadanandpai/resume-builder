import { z } from 'zod';

export const listTemplatesInputSchema = z.object({});

export const listTemplatesAnnotations = {
  title: 'List templates',
  readOnlyHint: true,
  destructiveHint: false,
};

export const listTemplatesDescription =
  'Lists the available resume templates and colour options. Pass a template id in ' +
  '__metadata.template.id when creating or updating a resume to select one.';

// Hand-mirrored from src/templates/designs/registry/templates.ts and
// src/helpers/constants/index.ts. Not imported directly: that file pulls in
// next/dynamic and React template components, which must never be reachable
// from this server's bundle. A test (listTemplates.test.ts) asserts these ids
// stay in sync with the real registry.
export const TEMPLATES = [
  { id: 'modern', name: 'Modern' },
  { id: 'classic', name: 'Classic' },
  { id: 'spotlight', name: 'Spotlight' },
  { id: 'professional', name: 'Professional' },
];

export const COLORS = {
  system: {
    id: 1,
    backgroundColor: '#fffdf7',
    fontColor: '#292524',
    titleColor: '#1e3a8a',
    highlighterColor: '#b45309',
  },
  customizable: {
    id: 2,
    backgroundColor: '#ffffff',
    fontColor: '#1f2937',
    titleColor: '#1e3a5f',
    highlighterColor: '#0f766e',
    note: "This swatch's four colors can each be freely overridden; there is no other preset.",
  },
};

export async function listTemplates() {
  return { templates: TEMPLATES, colors: COLORS };
}
