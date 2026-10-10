import { useEffect } from 'react';
import { create } from 'zustand';
import { TEMPLATE_SECTION_TITLES } from '@/helpers/section-layout/sectionTitles';

const STORAGE_KEY = 'resumeSectionTitles';
type Titles = Record<string, Record<string, string>>;
type State = {
  titles: Titles;
  hydrated: boolean;
  hydrate: () => void;
  setTitle: (templateId: string, sectionId: string, title: string) => void;
  resetTemplate: (templateId: string) => void;
};
function persist(titles: Titles) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, titles }));
  } catch {
    // Editing still works when browser storage is unavailable.
  }
}
export const useSectionTitleStore = create<State>((set, get) => ({
  titles: {},
  hydrated: false,
  hydrate: () => {
    if (get().hydrated || typeof window === 'undefined') return;
    const titles: Titles = {};
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.version === 1) {
        for (const [templateId, defaults] of Object.entries(TEMPLATE_SECTION_TITLES)) {
          for (const sectionId of Object.keys(defaults)) {
            const value = saved.titles?.[templateId]?.[sectionId];
            if (typeof value === 'string') {
              titles[templateId] ??= {};
              titles[templateId][sectionId] = value;
            }
          }
        }
      }
    } catch {
      // Ignore malformed storage.
    }
    set({ titles, hydrated: true });
  },
  setTitle: (templateId, sectionId, title) => {
    get().hydrate();
    if (!Object.hasOwn(TEMPLATE_SECTION_TITLES[templateId] ?? {}, sectionId)) return;
    const titles = {
      ...get().titles,
      [templateId]: { ...get().titles[templateId], [sectionId]: title },
    };
    set({ titles });
    persist(titles);
  },
  resetTemplate: (templateId) => {
    get().hydrate();
    const titles = { ...get().titles };
    delete titles[templateId];
    set({ titles });
    persist(titles);
  },
}));

export function useTemplateTitles(templateId: string) {
  const overrides = useSectionTitleStore((state) => state.titles[templateId]);
  useEffect(() => useSectionTitleStore.getState().hydrate(), []);
  return { ...TEMPLATE_SECTION_TITLES[templateId], ...overrides };
}
