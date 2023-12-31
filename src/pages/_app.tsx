import '../styles/globals.css';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from 'next/app';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { LocalizationProvider } from '@mui/x-date-pickers';
import AuthProvider from 'src/helpers/common/AuthProvider/AuthProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <ThemeProvider theme={GLOBAL_MUI_THEME}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Component {...pageProps} />
            <Analytics />
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
