import '../styles/globals.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useEffect } from 'react';

declare global {
  interface Window {
    _mfq: any;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Mouseflow analytics
    window._mfq = window._mfq || [];
    const mf = document.createElement('script');
    mf.type = 'text/javascript';
    mf.defer = true;
    mf.src = '//cdn.mouseflow.com/projects/2f28becd-e1bc-4244-9fd4-7a9788c05b25.js';
    document.getElementsByTagName('head')[0].appendChild(mf);
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
          <Analytics />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
