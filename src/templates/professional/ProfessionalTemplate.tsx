import React, { useContext } from 'react';

import AboutMe from './components/AboutMe';
import Achievements from './components/Achievements';
import BasicIntro from './components/BasicIntro';
import { Education } from './components/Education';
import Involvement from './components/Involvement';
import { Objective } from './components/Objective';
import RatedSkills from './components/RatedSkills';
import { Section } from './components/Section';
import { SectionValidator } from '@/helpers/common/components/ValidSectionRenderer';
import {
  SortableRegion,
  SortableTemplateSection,
  useSectionLayoutRuntime,
} from '@/helpers/section-layout';
import { StateContext } from '@/modules/builder/resume/ResumeLayout';
import UnratedSkills from './components/UnratedSkills';
import Work from './components/Work';
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
  font-size: 12px;
`;

export default function ProfessionalTemplate() {
  const resumeData = useContext(StateContext);
  const { regions } = useSectionLayoutRuntime();
  const skills = resumeData.skills;
  const involvements = resumeData.activities.involvements;
  const achievements = resumeData.activities.achievements;

  const renderLeft = (sectionId: string) => {
    switch (sectionId) {
      case 'work':
        return (
          <SectionValidator value={resumeData.work}>
            <Section title="Work Experience">
              <Work work={resumeData.work} />
            </Section>
          </SectionValidator>
        );
      case 'involvement':
        return (
          <SectionValidator value={involvements}>
            <Section title="Key Projects / Involvements">
              <Involvement data={involvements} />
            </Section>
          </SectionValidator>
        );
      case 'achievements':
        return (
          <SectionValidator value={achievements}>
            <Section title="Certificates and Awards">
              <Achievements data={achievements} />
            </Section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  const renderRight = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        return (
          <SectionValidator value={resumeData.basics.summary}>
            <Section title="Summary">
              <AboutMe summary={resumeData.basics.summary} profileImage={resumeData.basics.image} />
            </Section>
          </SectionValidator>
        );
      case 'objective':
        return (
          <SectionValidator value={resumeData.basics.objective}>
            <Section title="Career Objective">
              <Objective objective={resumeData.basics.objective} />
            </Section>
          </SectionValidator>
        );
      case 'tech_expertise':
        return (
          <SectionValidator value={skills.languages.concat(skills.frameworks)}>
            <Section title="Technical expertise">
              <RatedSkills items={skills.languages.concat(skills.frameworks)} />
            </Section>
          </SectionValidator>
        );
      case 'skills_exposure':
        return (
          <SectionValidator value={skills.technologies.concat(skills.libraries, skills.databases)}>
            <Section title="Skills / Exposure">
              <UnratedSkills
                items={skills.technologies.concat(skills.libraries, skills.databases)}
              />
            </Section>
          </SectionValidator>
        );
      case 'methodology':
        return (
          <SectionValidator value={skills.practices}>
            <Section title="Methodology/Approach">
              <UnratedSkills items={skills.practices} />
            </Section>
          </SectionValidator>
        );
      case 'tools':
        return (
          <SectionValidator value={skills.tools}>
            <Section title="Tools">
              <UnratedSkills items={skills.tools} />
            </Section>
          </SectionValidator>
        );
      case 'education':
        return (
          <SectionValidator value={resumeData.education}>
            <Section title="Education">
              <Education education={resumeData.education} />
            </Section>
          </SectionValidator>
        );
      default:
        return null;
    }
  };

  return (
    <ResumeContainer>
      <LeftSection>
        <Section
          title={resumeData.basics?.name}
          profiles={resumeData.basics.profiles}
          portfolioUrl={resumeData.basics.url}
          titleClassname="text-xl font-medium"
        >
          <BasicIntro basics={resumeData.basics} />
        </Section>
        <SortableRegion regionId="left" items={regions.left} className="flex flex-col gap-5">
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderLeft(id) ?? renderRight(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </LeftSection>

      <RightSection>
        <SortableRegion regionId="right" items={regions.right} className="flex flex-col gap-5">
          {(id) => (
            <SortableTemplateSection key={id} id={id}>
              {renderRight(id) ?? renderLeft(id)}
            </SortableTemplateSection>
          )}
        </SortableRegion>
      </RightSection>
    </ResumeContainer>
  );
}
