import { createJSONStorage, type StateStorage } from 'zustand/middleware';

// Resolve storage at use time: server rendering and blocked browser storage both
// retain defaults, while editing remains usable if writes fail (e.g. quota).
const storage: StateStorage = {
  getItem: (name) => {
    try {
      return localStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      localStorage.setItem(name, value);
    } catch {
      // Keep in-memory edits when storage is unavailable.
    }
  },
  removeItem: (name) => {
    try {
      localStorage.removeItem(name);
    } catch {
      // Storage may be unavailable.
    }
  },
};

export const browserResumeStorage = createJSONStorage(() => storage)!;
