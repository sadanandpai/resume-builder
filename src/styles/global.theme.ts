import { createTheme } from '@mui/material/styles';

export const GLOBAL_MUI_THEME = createTheme({
  palette: {
    resume50: {
      main: '#E7EEFA',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    resume50: object;
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    resume50?: object;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    resume50: true;
    // resume100: true;
    // resume200: true;
    // resume300: true;
    // resume400: true;
    // resume500: true;
    // resume600: true;
    // resume700: true;
    // resume800: true;
    // resume900: true;
  }
}
