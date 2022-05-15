import EditorLayout from './editor/EditorLayout';
import NavBarLayout from './nav-bar/NavBarLayout';
import ResumeHeader from './resume/components/ResumeHeader';
import { ResumeLayout } from './resume/ResumeLayout';

const BuilderLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1 max-h-[calc(100vh_-_3.5rem)]">
        <div className="flex flex-col flex-1 justify-center bg-custom-grey100">
          <header className="w-[210mm] mt-5 mb-3 mx-auto">
            <ResumeHeader />
          </header>
          <div className="overflow-auto no-scrollbar">
            <ResumeLayout />
          </div>
        </div>
        <aside className="w-[25vw] min-w-[20rem]">
          <EditorLayout />
        </aside>
      </main>
    </div>
  );
};

export default BuilderLayout;
