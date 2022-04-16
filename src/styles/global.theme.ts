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
    resume50: Palette['primary'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    resume50?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    resume50: true;
  }
}
