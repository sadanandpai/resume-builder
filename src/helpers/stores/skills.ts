import create from 'zustand';
import produce from 'immer';

export interface Item {
  value: string;
  score: number;
}

interface LanguageState {
  languages: Item[];
  addLanguage: ({ value, score }: { value: string; score: number }) => void;
  removeLanguage: (value: string) => void;
  setLanguages: (value: Item[]) => void;
}

export const useLanguages = create<LanguageState>((set) => ({
  languages: [
    { value: 'JavaScript', score: 60 },
    { value: 'HTML', score: 40 },
    { value: 'CSS', score: 80 },
  ],

  addLanguage: ({ value, score }) =>
    set(
      produce((state: LanguageState) => {
        state.languages.push({ value, score });
      })
    ),

  removeLanguage: (value) =>
    set((state: LanguageState) => ({
      languages: state.languages.filter((item) => item.value !== value),
    })),

  setLanguages: (languages) => set(() => ({ languages })),
}));
