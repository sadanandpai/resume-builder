import React, { useContext } from 'react';
import styled from '@emotion/styled';

const ResumeContainer = styled.div`
  display: flex;
  height: 100%;
  padding: 40px 25px;
  column-gap: 10px;

  @media print {
    border: none;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
`;

const sections = [
  'work',
  'key',
  'certificate',
  'identity',
  'career',
  'expert',
  'skill',
  'branch',
  'tool',
  'education',
];

import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import BasicIntro from './components/BasicIntro';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import RatedSkills from './components/RatedSkills';
import UnratedSkills from './components/UnratedSkills';

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const skills = resumeData.skills;

  return (
    <ResumeContainer>
      <LeftSection>
        <BasicIntro basics={resumeData.basics} />
        <Work work={resumeData.work} />
      </LeftSection>

      <RightSection>
        <AboutMe summary={resumeData.basics.summary} />
        <RatedSkills items={skills.languages.concat(skills.frameworks)} />
        <UnratedSkills items={skills.technologies.concat(skills.libraries, skills.databases)} />
        <UnratedSkills items={skills.practices} />
        <UnratedSkills items={skills.tools} />
      </RightSection>
    </ResumeContainer>
  );
}
