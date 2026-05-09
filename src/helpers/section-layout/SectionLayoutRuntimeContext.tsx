import { createContext, useContext } from 'react';

export type SectionLayoutRuntimeValue = {
  regions: Record<string, string[]>;
  regionKeys: string[];
};

export const SectionLayoutRuntimeContext = createContext<SectionLayoutRuntimeValue | null>(null);

export function useSectionLayoutRuntime(): SectionLayoutRuntimeValue {
  const v = useContext(SectionLayoutRuntimeContext);
  if (!v) {
    throw new Error('useSectionLayoutRuntime must be used within ResumeLayout');
  }
  return v;
}
