import React, { useState } from 'react';
import { headers } from 'src/helpers/constants/editor-data';
import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';
import ErrorBoundary from 'src/helpers/common/components/ErrorBoundary';

const EditorLayout = () => {
  const [link, setLink] = useState('');
  const section = headers[link];

  const linkClickHandler = (link: string) => {
    setLink(link);
  };

  const displayElement = link ? (
    <EditSection section={section} onLinkClick={linkClickHandler} />
  ) : (
    <DataHeaders onLinkClick={linkClickHandler} />
  );

  return (
    <ErrorBoundary>
      <div className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar shadow-level-4dp">
        {displayElement}
      </div>
    </ErrorBoundary>
  );
};

export default EditorLayout;
