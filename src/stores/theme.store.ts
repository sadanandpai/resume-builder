import create from 'zustand';

interface Theme {
  id?: number;
  fontColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
}

interface State {
  theme: Theme;
  customTheme: Theme;
}

export const themes: Theme[] = [
  {
    id: 0,
    fontColor: 'black',
    backgroundColor: 'white',
    primaryColor: '#1890ff',
    secondaryColor: 'yellowgreen',
  },
  {
    id: 1,
    fontColor: 'magenta',
    backgroundColor: 'white',
    primaryColor: 'lime',
    secondaryColor: 'burlywood',
  },
  {
    id: 2,
    fontColor: 'black',
    backgroundColor: 'white',
    primaryColor: 'green',
    secondaryColor: 'orange',
  },
];

export const customTheme: Theme = {
  fontColor: 'white',
  backgroundColor: 'black',
  primaryColor: 'yellow',
  secondaryColor: 'lime',
};

export const useThemes = create((set: any) => ({
  theme: themes[0],
  customTheme,

  chooseTheme: (index: number) => set({ theme: themes[index] }),
  chooseCustomTheme: () =>
    set((state: State) => ({
      theme: state.customTheme,
    })),

  setCustomTheme: (color: string, type: string) =>
    set((state: State) => {
      const userTheme = { ...state.customTheme, [type]: color };
      return { theme: userTheme, customTheme: userTheme };
    }),
}));
