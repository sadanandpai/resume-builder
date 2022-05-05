import { MordernTemplate } from 'src/templates/modern/MordernTemplate';
import ProfessionalTemplate from 'src/templates/professional/ProfessionalTemplate';
import ResumeHeader from './components/ResumeHeader';
import { Context, createContext } from 'react';
import { useResumeStore } from 'src/stores/useResumeStore';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  StateContext = createContext(resumeData);

  return (
    <div className="m-5">
      <header className="mb-3">
        <ResumeHeader />
      </header>
      <div className="h-[calc(100%_-_2.75rem)] overflow-auto no-scrollbar">
        <div className="w-[210mm] h-[296mm] bg-white">
          <StateContext.Provider value={resumeData}>
            <ProfessionalTemplate />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
