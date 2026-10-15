import { create } from 'zustand';

export const useCloudResumeStore = create<{
  id: string | null;
  revision: number;
  setId: (id: string | null) => void;
}>((set) => ({
  id: null,
  revision: 0,
  setId: (id) => set((state) => ({ id, revision: state.revision + 1 })),
}));
