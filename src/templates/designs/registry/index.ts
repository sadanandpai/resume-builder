export { TEMPLATE_REGISTRY } from './templates';

import { TEMPLATE_REGISTRY } from './templates';
import type { TemplateRegistryEntry } from './types';

export function getRegistryEntryByTemplateId(
  templateId: string
): TemplateRegistryEntry | undefined {
  return Object.values(TEMPLATE_REGISTRY).find((entry) => entry.id === templateId);
}
