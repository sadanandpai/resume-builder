import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';

import { GLOBAL_MUI_THEME } from '../styles/global.theme';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
