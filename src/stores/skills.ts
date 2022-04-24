import create from 'zustand';
import produce from 'immer';

export interface Item {
  name: string;
  score: number;
}

interface LanguageState {
  languages: Item[];
  addLanguage: ({ name, score }: { name: string; score: number }) => void;
  removeLanguage: (name: string) => void;
  setLanguages: (name: Item[]) => void;
}

export const useLanguages = create<LanguageState>((set) => ({
  languages: [
    { name: 'JavaScript', score: 60 },
    { name: 'HTML', score: 40 },
    { name: 'CSS', score: 80 },
  ],

  addLanguage: ({ name, score }) =>
    set(
      produce((state: LanguageState) => {
        state.languages.push({ name, score });
      })
    ),

  removeLanguage: (name) =>
    set((state: LanguageState) => ({
      languages: state.languages.filter((item) => item.name !== name),
    })),

  setLanguages: (languages) => set(() => ({ languages })),
}));

export const addSkillItem = (list: Item[], item: Item) => list.push(item);

export const removeSkillItem = (list: Item[], index: number) => list.splice(index, 1);
