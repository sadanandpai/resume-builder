import type { TemplateRegistryEntry } from './types';

// Shared by server validation and the editor. Keep component imports in templates.ts.
export const TEMPLATE_METADATA: Record<string, Pick<TemplateRegistryEntry, 'id' | 'name'>> = {
  modern: { id: 'modern', name: 'Modern' },
  classic: { id: 'classic', name: 'Classic' },
  spotlight: { id: 'spotlight', name: 'Spotlight' },
  professional: { id: 'professional', name: 'Professional' },
};
