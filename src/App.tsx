import React, { createContext, useState } from "react";
import { ThemeProvider } from "styled-components";
import { SettingsHeader } from "./components/core/settings-header/SettingsHeader";
import { Resume } from "./components/pages/Resume";
import { useThemes } from "./components/stores/theme.store";
import ReactToPrint from "react-to-print";
import { useReactToPrint } from "react-to-print";

interface AppContextProps {
  setPdfRef: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  exportPdfFn?: () => void;
}

const AppContext = createContext<AppContextProps | null>(null);
function App() {
  const theme = useThemes((state: any) => state.theme);
  const [resumePdf, setResumePdf] = useState<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    content: () => resumePdf,
  });

  return (
    <AppContext.Provider
      value={{
        setPdfRef: setResumePdf,
        exportPdfFn: handlePrint,
      }}
    >
      <SettingsHeader />

      <ThemeProvider theme={theme}>
        <Resume />
      </ThemeProvider>
      <ReactToPrint content={() => resumePdf} />
    </AppContext.Provider>
  );
}

export { App, AppContext };
