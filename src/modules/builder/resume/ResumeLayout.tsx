import { MordernTemplate } from 'src/templates/modern/MordernTemplate';
import ResumeHeader from './components/ResumeHeader';
import {
  useDatabases,
  useFrameworks,
  useLanguages,
  useLibraries,
  usePractices,
  useTechnologies,
  useTools,
} from 'src/stores/skills';
import { Context, createContext } from 'react';

export let StateContext: Context<any> = createContext(null);

export const ResumeLayout = () => {
  const skillState = {
    languages: useLanguages((state) => state.values),
    frameworks: useFrameworks((state) => state.values),
    technologies: useTechnologies((state) => state.values),
    libraries: useLibraries((state) => state.values),
    databases: useDatabases((state) => state.values),
    practices: usePractices((state) => state.values),
    tools: useTools((state) => state.values),
  };

  StateContext = createContext(skillState);

  return (
    <div className="my-5 overflow-y-auto no-scrollbar">
      <ResumeHeader />
      <div className="w-[210mm] h-[296mm] bg-white mt-3">
        <div className="h-full overflow-hidden">
          <StateContext.Provider value={skillState}>
            <MordernTemplate />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
