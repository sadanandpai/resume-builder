import React, { useContext } from 'react';
import styled from '@emotion/styled';

import { StateContext } from 'src/modules/builder/resume/ResumeLayout';
import BasicIntro from './components/BasicIntro';
import AboutMe from './components/AboutMe';
import Work from './components/Work';
import RatedSkills from './components/RatedSkills';
import UnratedSkills from './components/UnratedSkills';
import { Education } from './components/Education';
import { Section } from './components/Section';
import AwardComp from './components/Awards';
import { SectionValidator } from 'src/helpers/common/components/SectionValidator';

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

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const skills = resumeData.skills;

  return (
    <ResumeContainer>
      <LeftSection>
        <BasicIntro basics={resumeData.basics} />
        <SectionValidator value={resumeData.work}>
          <Section title="Work Experience">
            <Work work={resumeData.work} />
          </Section>
        </SectionValidator>

        <SectionValidator value={resumeData.awards}>
          <Section title="Awards / Accolades">
            <AwardComp awards={resumeData.awards} />
          </Section>
        </SectionValidator>
      </LeftSection>

      <RightSection>
        <SectionValidator value={resumeData.basics.summary}>
          <Section title="Summary">
            <AboutMe summary={resumeData.basics.summary} />
          </Section>
        </SectionValidator>

        <SectionValidator value={skills.languages.concat(skills.frameworks)}>
          <Section title="Technical expertise">
            <RatedSkills items={skills.languages.concat(skills.frameworks)} />
          </Section>
        </SectionValidator>

        <SectionValidator
          value={skills.technologies.concat(skills.libraries, skills.databases)}
        >
          <Section title="Skills / Exposure">
            <UnratedSkills items={skills.technologies.concat(skills.libraries, skills.databases)} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.practices}>
          <Section title="Methodology/Approach">
            <UnratedSkills items={skills.practices} />
          </Section>
        </SectionValidator>
        <SectionValidator value={skills.tools}>
          <Section title="Tools">
            <UnratedSkills items={skills.tools} />
          </Section>
        </SectionValidator>
        <SectionValidator value={resumeData.education}>
          <Section title="Education">
            <Education education={resumeData.education} />
          </Section>
        </SectionValidator>
      </RightSection>
    </ResumeContainer>
  );
}
