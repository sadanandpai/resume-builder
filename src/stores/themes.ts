import create from 'zustand';

import { SYSTEM_COLORS, CUSTOM_THEME_COLOR } from 'src/helpers/constants/index';
import { ThemeColorIntf } from 'src/helpers/constants/index.interface';

interface ThemeStore {
  selectedTheme: ThemeColorIntf;
  customTheme: ThemeColorIntf;
  chooseTheme: (theme: ThemeColorIntf) => void;
}

export const useThemes = create<ThemeStore>((set) => ({
  selectedTheme: SYSTEM_COLORS[0],
  customTheme: CUSTOM_THEME_COLOR,
  chooseTheme: (theme: ThemeColorIntf) => {
    set(() => ({ selectedTheme: theme }));
  },
}));
