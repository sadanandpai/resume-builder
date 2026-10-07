import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SYSTEM_COLORS, CUSTOM_THEME_COLOR } from '@/helpers/constants/index';
import { IThemeColor } from '@/helpers/constants/index.interface';

interface IThemeStore {
  selectedTheme: IThemeColor;
  customTheme: IThemeColor;
  chooseTheme: (theme: IThemeColor) => void;
  updateCustomTheme: (colors: Partial<Omit<IThemeColor, 'id'>>) => void;
}

export const useThemes = create<IThemeStore>()(
  persist(
    (set) => ({
      selectedTheme: SYSTEM_COLORS[0],
      customTheme: CUSTOM_THEME_COLOR,
      chooseTheme: (theme: IThemeColor) => {
        set(() => ({ selectedTheme: theme }));
      },
      updateCustomTheme: (colors) => {
        set((state) => {
          const customTheme = { ...state.customTheme, ...colors, id: CUSTOM_THEME_COLOR.id };
          return { customTheme, selectedTheme: customTheme };
        });
      },
    }),
    {
      name: 'themes',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<IThemeStore>;
        if (state.selectedTheme?.id === 2 || state.selectedTheme?.id === 3) {
          return { ...state, selectedTheme: SYSTEM_COLORS[0] };
        }
        return state;
      },
    }
  )
);
