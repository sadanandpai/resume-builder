import '@/styles/globals.css';

import { AppCacheProvider, createEmotionCache } from '@mui/material-nextjs/v15-pagesRouter';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { AppProps } from 'next/app';
import { EmotionCache } from '@emotion/cache';
import Head from 'next/head';
import { GLOBAL_MUI_THEME } from '../styles/global.theme';
import { GlobalStyles } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ThemeProvider } from '@mui/material/styles';

const clientCache = createEmotionCache({ enableCssLayer: true, key: 'css' });

export default function App(props: AppProps & { emotionCache?: EmotionCache }) {
  const { Component, pageProps, emotionCache = clientCache } = props;

  return (
    <AppCacheProvider {...props} emotionCache={emotionCache}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </Head>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Component {...pageProps} />
        </LocalizationProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
