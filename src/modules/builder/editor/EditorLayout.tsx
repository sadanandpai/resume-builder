import React from 'react';
import { useRouter } from 'next/router';
import DataHeaders from './components/DataHeaders';
import { EditorHeaders } from 'src/helpers/constants/editor-data';
import EditSection from './components/EditSection';

const EditorLayout = () => {
  const url = useRouter();
  const querySection = url.query.section as string;
  const section = EditorHeaders[querySection];

  return (
    <div className="bg-resume-50 h-full text-resume-800 p-6">
      {section ? <EditSection section={section} /> : <DataHeaders />}
    </div>
  );
};

export default EditorLayout;
