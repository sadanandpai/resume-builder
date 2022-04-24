import EditorLayout from './editor/EditorLayout';
import NavBarLayout from './nav-bar/NavBarLayout';
import { ResumeLayout } from './resume/ResumeLayout';

const BuilderLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1">
        <div className="flex flex-1 justify-center bg-custom-grey100">
          <ResumeLayout />
        </div>
        <aside className="w-[25vw] min-w-[20rem]">
          <EditorLayout />
        </aside>
      </main>
    </div>
  );
};

export default BuilderLayout;
