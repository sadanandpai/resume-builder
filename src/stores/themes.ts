import create from 'zustand';
import { persist } from 'zustand/middleware';

import { SYSTEM_COLORS, CUSTOM_THEME_COLOR } from 'src/helpers/constants/index';
import { IThemeColor } from 'src/helpers/constants/index.interface';

interface IThemeStore {
  selectedTheme: IThemeColor;
  customTheme: IThemeColor;
  chooseTheme: (theme: IThemeColor) => void;
}

export const useThemes = create<IThemeStore>(
  persist(
    (set) => ({
      selectedTheme: SYSTEM_COLORS[0],
      customTheme: CUSTOM_THEME_COLOR,
      chooseTheme: (theme: IThemeColor) => {
        set(() => ({ selectedTheme: theme }));
      },
    }),
    { name: 'themes' }
  )
);
