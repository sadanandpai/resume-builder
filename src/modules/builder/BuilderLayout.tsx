import React from 'react';
import EditorLayout from './editor/EditorLayout';
import NavBarLayout from './nav-bar/NavBarLayout';

const BuilderLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <NavBarLayout />
      <main className="flex flex-1">
        <div className="flex flex-1"></div>
        <aside className="w-[360px]">
          <EditorLayout />
        </aside>
      </main>
    </div>
  );
};

export default BuilderLayout;
