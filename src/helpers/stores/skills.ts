import create from 'zustand';

interface LanguageState {
  languages: string[];
  addLanguage: (language: string) => void;
  removeLanguage: (language: string) => void;
}

export const useLanguages = create<LanguageState>((set) => ({
  languages: ['JavaScript', 'HTML', 'CSS'],

  addLanguage: (language) => set((state) => ({ languages: state.languages.concat(language) })),
  removeLanguage: (language) =>
    set((state) => ({ languages: state.languages.filter((l) => l !== language) })),
}));
