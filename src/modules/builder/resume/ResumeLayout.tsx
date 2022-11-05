import { ThemeProvider } from '@mui/material/styles';

import { Context, createContext, useEffect } from 'react';
import { useResumeStore } from 'src/stores/useResumeStore';
import { useZoom } from 'src/stores/useZoom';
import { useThemes } from 'src/stores/themes';
import { useTemplates } from 'src/stores/useTemplate';
import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);

  const templateId = useTemplates((state) => state.activeTemplate?.id || '');
  const Template = AVAILABLE_TEMPLATES[templateId].component;
  const selectedTheme = useThemes((state) => state.selectedTheme);
  StateContext = createContext(resumeData);

  useEffect(() => {
    const selectedTemplateId =
      localStorage.getItem('selectedTemplateId') || AVAILABLE_TEMPLATES['modern'].id;
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[selectedTemplateId]);
  }, []);

  return (
    <div className="mx-5">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="origin-top transition-all duration-300 ease-linear	print:!scale-100"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto print:h-full">
          <StateContext.Provider value={resumeData}>
            <ThemeProvider theme={selectedTheme}>
              <Template />
            </ThemeProvider>
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
