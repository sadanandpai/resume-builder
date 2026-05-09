import { TEMPLATE_REGISTRY } from '@/templates/registry';
import type { TemplateSectionLayoutConfig } from '@/templates/registry/types';

export type { TemplateSectionLayoutConfig } from '@/templates/registry/types';

export const TEMPLATE_SECTION_LAYOUTS: Record<string, TemplateSectionLayoutConfig> =
  Object.fromEntries(
    Object.values(TEMPLATE_REGISTRY).map((entry) => [entry.id, entry.sectionLayout])
  );

export function getTemplateSectionLayoutConfig(templateId: string): TemplateSectionLayoutConfig {
  return (
    TEMPLATE_SECTION_LAYOUTS[templateId] ?? {
      regionKeys: ['main'],
      defaults: { main: [] },
    }
  );
}
