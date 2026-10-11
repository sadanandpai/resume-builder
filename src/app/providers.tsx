'use client';

import type { ReactNode } from 'react';
import { GlobalStyles } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Analytics } from '@vercel/analytics/next';
import { GLOBAL_MUI_THEME } from '@/styles/global.theme';

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>{children}</LocalizationProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
