import { Context, createContext } from 'react';
import { useResumeStore } from 'src/stores/useResumeStore';
import { useZoom } from 'src/stores/useZoom';
import { useTemplates } from 'src/stores/useTemplate';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const resumeData = useResumeStore();
  const zoom = useZoom((state) => state.zoom);
  const Template = useTemplates((state) => state.activeTemplate.component);

  StateContext = createContext(resumeData);

  return (
    <div className="mx-5">
      <div
        style={{ transform: `scale(${zoom})` }}
        className="origin-top transition-all duration-300 ease-linear	print:!scale-100"
      >
        <div className="w-[210mm] h-[296mm] bg-white my-0 mx-auto print:h-full">
          <StateContext.Provider value={resumeData}>
            <Template />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
