import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';
import DataHeaders from './components/DataHeaders';
import Skills from './components/Skills';
import Education from './components/Education';
import Experience from './components/Experience';
import Activities from './components/Activities';
import Volunteering from './components/Volunteering';
import Awards from './components/Awards';
import Basic from './components/Basic';

const sectionMap: { [key: string]: ReactElement } = {
  basicdetails: <Basic />,
  skillsandexpertise: <Skills />,
  education: <Education />,
  experience: <Experience />,
  activities: <Activities />,
  volunteering: <Volunteering />,
  awards: <Awards />,
};

const EditorLayout = () => {
  const url = useRouter();
  const section = sectionMap[url.query.section as string];

  return (
    <div className="bg-resume-50 h-full text-resume-800 p-8">{section ?? <DataHeaders />}</div>
  );
};

export default EditorLayout;
