import { getTemplateSectionLayoutConfig } from '@/helpers/section-layout/template-defaults';
import { normalizeRegionLayout } from '@/helpers/section-layout/normalizeRegionLayout';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useCallback, useMemo } from 'react';

export function useTemplateSectionLayout(templateId: string, allowed: Set<string>) {
  const stored = useSectionLayoutStore((s) => s.layouts[templateId]);
  const setLayout = useSectionLayoutStore((s) => s.setLayout);
  const config = getTemplateSectionLayoutConfig(templateId);

  const regions = useMemo(() => {
    const normalized = normalizeRegionLayout(stored, allowed, config.defaults, config.regionKeys);
    // Keep Classic education as the closing section, including saved layouts.
    if (templateId === 'classic' && normalized.main?.includes('education')) {
      normalized.main = normalized.main.filter((id) => id !== 'education').concat('education');
    }
    return normalized;
  }, [templateId, stored, allowed, config.defaults, config.regionKeys]);

  const setRegions = useCallback(
    (next: Record<string, string[]>) => {
      setLayout(templateId, next);
    },
    [setLayout, templateId]
  );

  return {
    regions,
    setRegions,
    regionKeys: config.regionKeys,
    defaults: config.defaults,
  };
}
