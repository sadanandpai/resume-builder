import create from 'zustand';

import { SYSTEM_COLORS, CUSTOM_THEME_COLOR } from 'src/helpers/constants/index';
import { IThemeColor } from 'src/helpers/constants/index.interface';

interface IThemeStore {
  selectedTheme: IThemeColor;
  customTheme: IThemeColor;
  chooseTheme: (theme: IThemeColor) => void;
}

export const useThemes = create<IThemeStore>((set) => ({
  selectedTheme: SYSTEM_COLORS[0],
  customTheme: CUSTOM_THEME_COLOR,
  chooseTheme: (theme: IThemeColor) => {
    set(() => ({ selectedTheme: theme }));
  },
}));
