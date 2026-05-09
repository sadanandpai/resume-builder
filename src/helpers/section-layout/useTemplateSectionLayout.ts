import { getTemplateSectionLayoutConfig } from '@/helpers/section-layout/template-defaults';
import { normalizeRegionLayout } from '@/helpers/section-layout/normalizeRegionLayout';
import { useSectionLayoutStore } from '@/stores/useSectionLayoutStore';
import { useCallback, useMemo } from 'react';

export function useTemplateSectionLayout(templateId: string, allowed: Set<string>) {
  const stored = useSectionLayoutStore((s) => s.layouts[templateId]);
  const setLayout = useSectionLayoutStore((s) => s.setLayout);
  const config = getTemplateSectionLayoutConfig(templateId);

  const regions = useMemo(
    () => normalizeRegionLayout(stored, allowed, config.defaults, config.regionKeys),
    [stored, allowed, config.defaults, config.regionKeys]
  );

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
