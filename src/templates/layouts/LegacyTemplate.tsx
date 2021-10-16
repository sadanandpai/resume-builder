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
import { List } from 'src/templates/components/list/List';
import { LineSeparator } from 'src/templates/components/separator/LineSeparator';
import { LegacyHeader } from 'src/templates/components/section-layout/LegacyHeader';
import { SocialBar } from 'src/templates/components/social/SocialBar';
import {
  useIntro,
  useSocial,
  useExp,
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
  const experience = useExp((state: any) => state);
  const [keyProjects, certificates] = useAchievements(
    (state: any) => [state.keyProjects, state.certificates],
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
        <Intro intro={intro} experience={experience} />
        <SocialBar items={social} />

        <LegacyHeader Icon={getIcon(experience.title)} title={experience.title} />
        <Exp companies={experience.companies} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon(keyProjects.title)} title={keyProjects.title} />
        <List items={keyProjects.items} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon(certificates.title)} title={certificates.title} />
        <List items={certificates.items} />
      </GridColumn>

      <Divider />

      <GridColumn>
        <LegacyHeader Icon={getIcon(intro.aboutTitle)} title={intro.aboutTitle} />
        <Description description={intro.aboutDescription} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon(intro.objectiveTitle)} title={intro.objectiveTitle} />
        <Description description={intro.objectiveDescription} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('Technical Expertise')} title="Technical Expertise" />
        <RatedPill items={[...languages, ...frameworks]} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('Skills / Expsoure')} title="Skills / Expsoure" />
        <UnratedTabs items={[...technologies, ...libraries, ...databases]} />

        <LineSeparator />
        <LegacyHeader Icon={getIcon('Methodology / Approach')} title="Methodology / Approach" />
        <UnratedTabs items={practices} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon('Tools')} title="Tools" />
        <UnratedTabs items={tools} />
        <LineSeparator />
        <LegacyHeader Icon={getIcon(education.title)} title={education.title} />
        <EduSection items={education.items} />
      </GridColumn>
    </GridContainer>
  );
}
