/* eslint-disable @typescript-eslint/no-explicit-any */
import { getRegistryEntryByTemplateId } from '@/templates/registry';

/** Uses registry rules so templates stay in sync with SectionValidator “has content” checks. */
export function getAllowedSectionIdsForTemplate(templateId: string, resumeData: any): Set<string> {
  const entry = getRegistryEntryByTemplateId(templateId);
  if (!entry) return new Set();

  const allowedSectionIds = new Set<string>();
  for (const rule of entry.sectionRules) {
    if (rule.when(resumeData)) allowedSectionIds.add(rule.sectionId);
  }
  return allowedSectionIds;
}
