import React, { useState } from 'react';
import { headers } from 'src/helpers/constants/editor-data';
import DataHeaders from './components/EditHeaders';
import EditSection from './components/EditSection';

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
    <div className="bg-resume-50 h-full text-resume-800 p-6 overflow-auto relative no-scrollbar">
      {displayElement}
    </div>
  );
};

export default EditorLayout;
