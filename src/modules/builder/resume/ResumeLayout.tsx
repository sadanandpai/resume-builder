// import { MordernTemplate } from 'src/templates/modern/MordernTemplate';
import ProfessionalTemplate from 'src/templates/professional/ProfessionalTemplate';
import { Context, createContext } from 'react';
import { useResumeStore } from 'src/stores/useResumeStore';
import { useZoom } from 'src/stores/useZoom';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);
  StateContext = createContext(resumeData);

  return (
    <div className="mx-5">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="origin-top transition-all duration-300 ease-linear	"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto">
          <StateContext.Provider value={resumeData}>
            <ProfessionalTemplate />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
