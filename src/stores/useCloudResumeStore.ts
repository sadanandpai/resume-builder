import { create } from 'zustand';

export const useCloudResumeStore = create<{
  id: string | null;
  code: string | null;
  revision: number;
  copiedEditCodes: Record<string, string>;
  markEditLinkCopied: (id: string, code: string) => void;
  setId: (id: string | null, code?: string | null) => void;
}>((set) => ({
  id: null,
  code: null,
  revision: 0,
  copiedEditCodes: {},
  markEditLinkCopied: (id, code) =>
    set((state) => ({ copiedEditCodes: { ...state.copiedEditCodes, [id]: code } })),
  setId: (id, code = null) =>
    set((state) => ({ id, code: id ? code : null, revision: state.revision + 1 })),
}));
