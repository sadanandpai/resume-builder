import React from 'react';
import shallow from 'zustand/shallow';
import styled from 'styled-components';
import { getIcon } from 'src/assets/icons';

import { Intro } from 'src/templates/components/intro/Intro';
import { Description } from 'src/templates/components/description/Description';
import { RatedPill } from 'src/templates/components/skills/RatedPills';
import { UnratedTabs } from 'src/templates/components/skills/UnratedTabs';
import { Exp } from 'src/templates/components/exp/Exp';
import { EduSection } from 'src/templates/components/education/EduSection';
import { LineSeparator } from 'src/templates/components/separator/LineSeparator';
import { LegacyHeader } from 'src/templates/components/section-layout/LegacyHeader';
import { SocialBar } from 'src/templates/components/social/SocialBar';
import {
  useIntro,
  useSocial,
  useWork,
  useSkills,
  useAchievements,
  useEducation,
} from 'src/stores/data.store';

const GridContainer = styled.div`
  margin: auto;
  display: grid;
  padding: 40px 25px;
  grid-template-columns: 68% 10px 1fr;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Divider = styled.div`
  height: 100%;
  width: 2px;
  background-color: #007bff;
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:first-child {
    padding-right: 10px;
  }
`;

const EmployeName = styled.div`
  margin: 0;
  color: ${(props) => props.theme.primaryColor};
  font-size: 1.5rem;
`;

export function LegacyTemplate() {
  const intro = useIntro((state: any) => state);
  const social = useSocial((state: any) => state);
  const education = useEducation((state: any) => state.education);
  const experience = useWork((state: any) => state);
  const [projects, awards] = useAchievements(
    (state: any) => [state.projects, state.awards],
    shallow
  );
  const [languages, frameworks, libraries, databases, technologies, practices, tools] = useSkills(
    (state: any) => [
      state.languages,
      state.frameworks,
      state.libraries,
      state.databases,
      state.technologies,
      state.practices,
      state.tools,
    ],
    shallow
  );

  return (
    <GridContainer>
      <GridColumn>
        <EmployeName>{intro.name}</EmployeName>
        <Intro intro={intro} />
        <SocialBar items={social} />

        <LegacyHeader Icon={getIcon('work')} title="Experience" />
        <Exp companies={experience.companies} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('key')} title="Key Projects / Involvements" />
        <Description description={projects} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon('certificate')} title="Certificates and Awards" />
        <Description description={awards} />
      </GridColumn>

      <Divider />

      <GridColumn>
        <LegacyHeader Icon={getIcon('identity')} title="About me" />
        <Description description={intro.summary} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('career')} title="Career Objective" />
        <Description description={intro.objective} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('expert')} title="Technical Expertise" />
        <RatedPill items={[...languages, ...frameworks]} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('skill')} title="Skills / Expsoure" />
        <UnratedTabs items={[...technologies, ...libraries, ...databases]} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon('branch')} title="Methodology / Approach" />
        <UnratedTabs items={practices} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('tool')} title="Tools" />
        <UnratedTabs items={tools} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('education')} title="Education" />
        <EduSection education={education} />
      </GridColumn>
    </GridContainer>
  );
}
