import React from 'react';
import shallow from 'zustand/shallow';
import styled from 'styled-components';
import { getIcon } from 'src/styles/icons';

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
  useWork,
  useSkills,
  useActivities,
  useEducation,
  useLabels,
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

export default function LegacyTemplate() {
  const intro = useIntro((state: any) => state.intro);
  const education = useEducation((state: any) => state.education);
  const experience = useWork((state: any) => state);
  const [involvements, achievements] = useActivities(
    (state: any) => [state.involvements, state.achievements],
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

  const labels = useLabels((state: any) => state.labels);

  return (
    <GridContainer>
      <GridColumn>
        <EmployeName>{intro.name}</EmployeName>
        <Intro intro={intro} labels={labels} />
        <SocialBar profiles={intro.profiles} />

        <LegacyHeader Icon={getIcon('work')} title={labels[0]} />
        <Exp companies={experience.companies} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('key')} title={labels[1]} />
        <Description description={involvements} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon('certificate')} title={labels[2]} />
        <Description description={achievements} />
      </GridColumn>

      <Divider />

      <GridColumn>
        <LegacyHeader Icon={getIcon('identity')} title={labels[3]} />
        <Description description={intro.summary} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('career')} title={labels[4]} />
        <Description description={intro.objective} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('expert')} title={labels[5]} />
        <RatedPill items={[...languages, ...frameworks]} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('skill')} title={labels[6]} />
        <UnratedTabs items={[...technologies, ...libraries, ...databases]} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon('branch')} title={labels[7]} />
        <UnratedTabs items={practices} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('tool')} title={labels[8]} />
        <UnratedTabs items={tools} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('education')} title={labels[9]} />
        <EduSection education={education} />
      </GridColumn>
    </GridContainer>
  );
}
