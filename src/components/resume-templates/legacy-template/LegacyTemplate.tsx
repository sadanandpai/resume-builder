import React from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { getIcon } from "../../common/icons";

import { Intro } from "../professional-template/features/Intro";
import { Description } from "../professional-template/features/Description";
import { RatingElement } from "./core/RatingElement";
import { UnratedSection } from "../professional-template/features/UnratedSection";
import { Exp } from "../professional-template/features/Exp";
import { EduSection } from "../professional-template/features/EduSection";
import { ListSection } from "../professional-template/features/ListSection";

import { Separator } from "./core/Separator";
import { SectionHeader } from "./core/SectionHeader";
import { SocialBar } from "./core/SocialBar";

import {
  useIntro,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from "../../stores/data.store";

const GridContainer = styled.div`
  margin: auto;
  display: grid;
  grid-template-columns: 68% 10px 1fr;;
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

  &:first-child{
    padding-right: 10px;
  }
`;

const EmployeName = styled.div`
  margin: 0;
  color: ${(props) => props.theme.primaryColor};
  font-size: 1.5rem;
`

export function LegacyTemplate() {
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

  return (
    <GridContainer>
      <GridColumn>
        <EmployeName>{intro?.name}</EmployeName>
        <Intro data={intro} />
        <SocialBar items={intro?.social} />

        <SectionHeader
          Icon={getIcon(experience?.title)}
          title={experience?.title}
        />
        <Exp companies={experience?.companies} />
        <Separator />
        <SectionHeader
          Icon={getIcon(keyProjects?.title)}
          title={keyProjects?.title}
        />
        <ListSection items={keyProjects?.items} />

        <Separator />
        <SectionHeader
          Icon={getIcon(certificates?.title)}
          title={certificates?.title}
        />
        <ListSection items={certificates?.items} />
      </GridColumn>

      <Divider />

      <GridColumn>
        <SectionHeader
          Icon={getIcon(intro.about?.title)}
          title={intro.about?.title}
        />
        <Description description={intro.about?.description} />
        <Separator />
        <SectionHeader
          Icon={getIcon(intro.objective?.title)}
          title={intro.objective?.title}
        />
        <Description description={intro.objective?.description} />
        <Separator />
        <SectionHeader
          Icon={getIcon(technical?.title)}
          title={technical?.title}
        />
        <RatingElement items={technical?.items} />
        <Separator />
        <SectionHeader Icon={getIcon(exposure?.title)} title={exposure?.title} />
        <UnratedSection items={exposure?.items} />

        <Separator />
        <SectionHeader
          Icon={getIcon(methodology?.title)}
          title={methodology?.title}
        />
        <UnratedSection items={methodology?.items} />
        <Separator />
        <SectionHeader Icon={getIcon(tools?.title)} title={tools?.title} />
        <UnratedSection items={tools?.items} />
        <Separator />
        <SectionHeader
          Icon={getIcon(education?.title)}
          title={education?.title}
        />
        <EduSection items={education?.items} />
      </GridColumn>
    </GridContainer>
  );
}
