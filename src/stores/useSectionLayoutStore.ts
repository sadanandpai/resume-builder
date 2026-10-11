import { browserResumeStorage } from './browserResumeStorage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const STORAGE_KEY = 'resumeSectionLayouts';

type SectionLayoutByTemplate = Record<string, Record<string, string[]>>;

type SectionLayoutState = {
  layouts: SectionLayoutByTemplate;
  isReorderMode: boolean;
  setLayout: (templateId: string, regions: Record<string, string[]>) => void;
  setReorderMode: (enabled: boolean) => void;
  toggleReorderMode: () => void;
  resetTemplate: (templateId: string) => void;
  resetAll: () => void;
};

export const useSectionLayoutStore = create<SectionLayoutState>()(
  persist(
    (set) => ({
      layouts: {},
      isReorderMode: false,
      setLayout: (templateId, regions) =>
        set((s) => ({
          layouts: { ...s.layouts, [templateId]: regions },
        })),
      setReorderMode: (enabled) => set({ isReorderMode: enabled }),
      toggleReorderMode: () => set((s) => ({ isReorderMode: !s.isReorderMode })),
      resetTemplate: (templateId) =>
        set((s) => {
          const next = { ...s.layouts };
          delete next[templateId];
          return { layouts: next };
        }),
      resetAll: () => set({ layouts: {}, isReorderMode: false }),
    }),
    {
      skipHydration: true,
      storage: browserResumeStorage,
      name: STORAGE_KEY,
      partialize: (state) => ({ layouts: state.layouts, isReorderMode: state.isReorderMode }),
    }
  )
);
