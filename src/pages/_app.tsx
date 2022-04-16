import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import { GLOBAL_MUI_THEME } from '../styles/global.theme';

import '../styles/globals.css';

const cache = createCache({
  key: 'css',
  prepend: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
