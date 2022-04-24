import EditorLayout from './editor/EditorLayout';
import NavBarLayout from './nav-bar/NavBarLayout';

const BuilderLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1 max-h-[calc(100vh_-_3.5rem)]">
        <div className="flex flex-1"></div>
        <aside className="w-[25vw] min-w-[20rem]">
          <EditorLayout />
        </aside>
      </main>
    </div>
  );
};

export default BuilderLayout;
