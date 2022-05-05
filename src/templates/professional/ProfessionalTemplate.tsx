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
  font-size: 14px;
`;

// const sections = [
//   'work',
//   'key',
//   'certificate',
//   'identity',
//   'career',
//   'expert',
//   'skill',
//   'branch',
//   'tool',
//   'education',
// ];

import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import BasicIntro from './components/BasicIntro';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import RatedSkills from './components/RatedSkills';
import UnratedSkills from './components/UnratedSkills';
import { Education } from './components/Education';
import { Section } from './components/Section';

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const skills = resumeData.skills;

  return (
    <ResumeContainer>
      <LeftSection>
        <BasicIntro basics={resumeData.basics} />
        <Section title="Work Experience">
          <Work work={resumeData.work} />
        </Section>
      </LeftSection>

      <RightSection>
        <Section title="Summary">
          <AboutMe summary={resumeData.basics.summary} />
        </Section>
        <Section title="Technical expertise">
          <RatedSkills items={skills.languages.concat(skills.frameworks)} />
        </Section>
        <Section title="Skills / Exposure">
          <UnratedSkills items={skills.technologies.concat(skills.libraries, skills.databases)} />
        </Section>
        <Section title="Methodology/Approach">
          <UnratedSkills items={skills.practices} />
        </Section>
        <Section title="Tools">
          <UnratedSkills items={skills.tools} />
        </Section>
        <Section title="Education">
          <Education education={resumeData.education} />
        </Section>
      </RightSection>
    </ResumeContainer>
  );
}
