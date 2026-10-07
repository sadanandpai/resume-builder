import { create } from 'zustand';
import { validateStyles, type StyleSettings, type StyleGroup } from '@/helpers/resume-style/styles';

const STORAGE_KEY = 'resumeStyles';
const equal = (a: StyleSettings, b: StyleSettings) => JSON.stringify(a) === JSON.stringify(b);
function persist(settings: StyleSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, settings }));
  } catch {
    /* Storage may be unavailable or full. */
  }
}
type State = {
  settings: StyleSettings;
  past: StyleSettings[];
  future: StyleSettings[];
  baseline: StyleSettings | null;
  hydrated: boolean;
  hydrate: () => void;
  preview: (settings: StyleSettings) => void;
  commit: (settings?: StyleSettings) => void;
  resetGroup: (group: StyleGroup) => void;
  reset: () => void;
  preset: (preset: 'compact' | 'balanced' | 'spacious') => void;
  undo: () => void;
  redo: () => void;
};
export const useResumeStyleStore = create<State>((set, get) => ({
  settings: {},
  past: [],
  future: [],
  baseline: null,
  hydrated: false,
  hydrate: () => {
    if (get().hydrated || typeof window === 'undefined') return;
    let settings: StyleSettings = {};
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (saved?.version === 1) settings = validateStyles(saved.settings);
    } catch {
      /* Ignore malformed storage. */
    }
    set({ settings, hydrated: true });
  },
  preview: (settings) =>
    set((s) => ({ baseline: s.baseline ?? s.settings, settings: validateStyles(settings) })),
  commit: (settings) => {
    const s = get();
    const next = validateStyles(settings ?? s.settings);
    const before = s.baseline ?? s.settings;
    set({
      settings: next,
      baseline: null,
      ...(equal(before, next) ? {} : { past: [...s.past, before].slice(-50), future: [] }),
    });
    persist(next);
  },
  resetGroup: (group) => {
    get().commit();
    const next = { ...get().settings };
    delete next[group];
    get().commit(next);
  },
  reset: () => {
    get().commit();
    get().commit({});
  },
  preset: (preset) => {
    get().commit();
    const next = { ...get().settings };
    delete next.spacing;
    next.typography = { ...next.typography };
    delete next.typography.lineHeight;
    if (preset === 'balanced') delete next.density;
    else next.density = preset;
    get().commit(next);
  },
  undo: () => {
    get().commit();
    const s = get();
    if (!s.past.length) return;
    const settings = s.past[s.past.length - 1];
    set({ settings, past: s.past.slice(0, -1), future: [s.settings, ...s.future].slice(0, 50) });
    persist(settings);
  },
  redo: () => {
    get().commit();
    const s = get();
    if (!s.future.length) return;
    const settings = s.future[0];
    set({ settings, past: [...s.past, s.settings].slice(-50), future: s.future.slice(1) });
    persist(settings);
  },
}));
