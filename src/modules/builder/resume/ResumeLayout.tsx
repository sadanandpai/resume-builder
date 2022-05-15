// import { MordernTemplate } from 'src/templates/modern/MordernTemplate';
import ProfessionalTemplate from 'src/templates/professional/ProfessionalTemplate';
import ResumeHeader from './components/ResumeHeader';
import { Context, createContext } from 'react';
import { useResumeStore } from 'src/stores/useResumeStore';
import { useZoom } from 'src/stores/useZoom';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);
  StateContext = createContext(resumeData);

  return (
    <div className="m-5">
      <header className="mb-3">
        <ResumeHeader />
      </header>
      <div
        style={{ transform: `scale(${zoom})` }}
        className="h-[calc(100%_-_2.75rem)] overflow-auto origin-top no-scrollbar"
      >
        <div className="w-[210mm] h-[296mm] bg-white">
          <StateContext.Provider value={resumeData}>
            <ProfessionalTemplate />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
