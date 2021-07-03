import React, { useState } from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { FlexCol } from "../../components/common/styles";
import { getIcon } from "../../components/common/icons";

import { ModernHeader, ModernHeaderIntro } from "../items/section-layout/ModernHeader";
import { Intro } from "../items/intro/Intro";
import { Description } from "../items/description/Description";
import { RatedBars } from "../items/skills/RatedBars";
import { UnratedTabs } from "../items/skills/UnratedTabs";
import { Exp } from "../items/exp/Exp";
import { EduSection } from "../items/education/EduSection";
import { List } from "../items/list/List";

import {
  useIntro,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from "../../components/stores/data.store";

const LeftSection = styled(FlexCol)`
  flex-basis: 66%;
  row-gap: 20px;
  height: 100%;
`;

const RightSection = styled(FlexCol)`
  flex-basis: 34%;
  row-gap: 20px;
  height: 100%;
  justify-content: space-between;
`;

export function ProfessionalTemplate() {
  const intro = useIntro((state: any) => state.intro);
  const education = useEducation((state: any) => state.education);
  const experience = useExp((state: any) => state.experience);
  const [keyProjects, certificates] = useAchievements(
    (state: any) => [state.keyProjects, state.certificates],
    shallow
  );
  const [technical, exposure, methodology, tools] = useSkills(
    (state: any) => [
      state.technical,
      state.exposure,
      state.methodology,
      state.tools,
    ],
    shallow
  );
  
  const leftSections = [
    {
      title: experience.title,
      component: <Exp companies={experience.companies} />,
      styles: { flexGrow: 1 },
    },
    {
      title: keyProjects.title,
      component: <List items={keyProjects.items} />,
    },
    {
      title: certificates.title,
      component: <List items={certificates.items} />,
    },
  ];
  const rightSections = [
    {
      title: intro.about.title,
      component: (
        <Description
          photo={intro.photo}
          description={intro.about.description}
        />
      ),
    },
    {
      title: intro.objective.title,
      component: <Description description={intro.objective.description} />,
    },
    {
      title: technical.title,
      component: <RatedBars items={technical.items} />,
    },
    { title: exposure.title, component: <UnratedTabs items={exposure.items} /> },
    {
      title: methodology.title,
      component: <UnratedTabs items={methodology.items} />,
    },
    { title: tools.title, component: <UnratedTabs items={tools.items} /> },
    {
      title: education.title,
      component: <EduSection items={education.items} />,
    },
  ];

  return (
    <>
      <LeftSection>
        <ModernHeaderIntro title={intro.name} icons={intro.social}>
          <Intro data={intro} />
        </ModernHeaderIntro>

        {leftSections.map(({ title, component, styles }) => {
          return (
            <ModernHeader icon={getIcon(title)} title={title} styles={styles} key={title}>
              {component}
            </ModernHeader>
          );
        })}
      </LeftSection>

      <RightSection>
        {rightSections.map(({ title, component }) => {
          return (
            <ModernHeader icon={getIcon(title)} title={title} key={title}>
              {component}
            </ModernHeader>
          );
        })}
      </RightSection>
    </>
  );
}
