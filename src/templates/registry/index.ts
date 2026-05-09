export type {
  TemplateRegistryEntry,
  TemplateSectionLayoutConfig,
  TemplateSectionRule,
} from './types';
export { REGION_IDS, SECTION_IDS, type RegionId, type SectionId } from './sectionIds';
export { TEMPLATE_REGISTRY } from './templates';
export * as templatePredicates from './predicates';

import { TEMPLATE_REGISTRY } from './templates';
import type { TemplateRegistryEntry } from './types';

export function getRegistryEntryByTemplateId(
  templateId: string
): TemplateRegistryEntry | undefined {
  return Object.values(TEMPLATE_REGISTRY).find((entry) => entry.id === templateId);
}
