import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Home } from 'src/pages/Home';
import { useThemes } from 'src/stores/theme.store';

export function App() {
  const theme = useThemes((state: any) => state.theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </>
  );
}
