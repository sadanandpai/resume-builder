import { draftStorage } from './resumeDraftStorage';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';

// Resolve storage at use time: server rendering and blocked browser storage both
// retain defaults, while editing remains usable if writes fail (e.g. quota).
const storage: StateStorage = {
  getItem: (name) => {
    try {
      return draftStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name, value) => {
    try {
      draftStorage.setItem(name, value);
    } catch {
      // Keep in-memory edits when storage is unavailable.
    }
  },
  removeItem: (name) => {
    try {
      draftStorage.removeItem(name);
    } catch {
      // Storage may be unavailable.
    }
  },
};

export const browserResumeStorage = createJSONStorage(() => storage)!;
