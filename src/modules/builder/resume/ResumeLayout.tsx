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
    languages: useLanguages((state) => state.get()),
    frameworks: useFrameworks((state) => state.get()),
    technologies: useTechnologies((state) => state.get()),
    libraries: useLibraries((state) => state.get()),
    databases: useDatabases((state) => state.get()),
    practices: usePractices((state) => state.get()),
    tools: useTools((state) => state.get()),
  };

  StateContext = createContext(skillState);

  return (
    <div className="m-5">
      <header className="mb-3">
        <ResumeHeader />
      </header>
      <div className="h-[calc(100%_-_2.75rem)] overflow-auto no-scrollbar">
        <div className="w-[210mm] h-[296mm] bg-white">
          <StateContext.Provider value={skillState}>
            <MordernTemplate />
          </StateContext.Provider>
        </div>
      </div>
    </div>
  );
};
