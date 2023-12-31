import { Context, createContext, useEffect } from 'react';

import { AVAILABLE_TEMPLATES } from 'src/helpers/constants';
import { ThemeProvider } from '@mui/material/styles';
import { resetResumeStore, updateResumeStore, useResumeStore } from 'src/stores/useResumeStore';
import { useTemplates } from 'src/stores/useTemplate';
import { useThemes } from 'src/stores/themes';
import { useZoom } from 'src/stores/useZoom';
import fetcher from 'src/helpers/utils/fetcher';
import useSWR from 'swr';
import { APP_STRAPI_BASE_URL } from 'src/helpers/utils/constant';
import { useAuthContext } from 'src/helpers/context/AuthContext';

// TODO: need to define types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);

  const templateId = useTemplates((state) => state.activeTemplate.id);
  const Template = AVAILABLE_TEMPLATES[templateId].component;
  const selectedTheme = useThemes((state) => state.selectedTheme);
  StateContext = createContext(resumeData);
  const { user, setUser } = useAuthContext();

  const fetchURL = `${APP_STRAPI_BASE_URL}/users/me`;
  const { data, error } = useSWR(fetchURL, fetcher);

  useEffect(() => {
    resetResumeStore();
    const selectedTemplateId =
      localStorage.getItem('selectedTemplateId') || AVAILABLE_TEMPLATES['modern'].id;
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES[selectedTemplateId]);

    if (!error && data && data.profile) {
      const eResume = data.profile;
      if (!!eResume) {
        updateResumeStore(eResume);
        setUser(data);
      }
    }
  }, [data, error]);

  return (
    <div className="mx-5 print:mx-0 mb-2 print:mb-0">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="origin-top transition-all duration-300 ease-linear	print:!scale-100"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto">
          <StateContext.Provider value={resumeData}>
            <ThemeProvider theme={selectedTheme}>{Template && <Template />}</ThemeProvider>
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
