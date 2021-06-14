import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { Resume } from "./components/pages/Resume";
import { useThemes } from "./components/stores/theme.store";
import { Switch } from "antd";

export function App() {
  const theme = useThemes((state: any) => state.theme);
  const setDarkMode = useThemes((state: any) => state.setDarkMode);

  return (
    <ThemeProvider theme={theme}>
      <Switch onChange={setDarkMode} size="small" />
      <Resume />
    </ThemeProvider>
  );
}
