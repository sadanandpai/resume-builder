import React from "react";
import { ThemeProvider } from "styled-components";
import { SettingsHeader } from "./components/core/settings-header/SettingsHeader";
import { Resume } from "./components/pages/Resume";
import { useIntro } from "./components/stores/data.store";
import { useThemes } from "./components/stores/theme.store";

export function App() {
  const theme = useThemes((state: any) => state.theme);

  return (
    <>
      <SettingsHeader />
      <ThemeProvider theme={theme}>
        <Resume />
      </ThemeProvider>
    </>
  );
}
