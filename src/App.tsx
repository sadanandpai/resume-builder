import React from "react";
import { ThemeProvider } from "styled-components";
import { Home } from "./components/pages/Home";
import { useThemes } from "./components/stores/theme.store";

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
