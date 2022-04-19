import { createTheme } from '@mui/material/styles';

export const GLOBAL_MUI_THEME = createTheme({
  palette: {
    resume: {
      50: '#E7EEFA',
      100: '#C7D6E4',
      200: '#A8B9CC',
      300: '#889DB3',
      400: '#7188A1',
      500: '#59748F',
      600: '#4C667E',
      700: '#3C5268',
      800: '#2E4052',
      900: '#1C2C3A',
    },
    primary: {
      main: '#2E4052',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    resume: Palette['grey'];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    resume?: PaletteOptions['grey'];
  }
}
