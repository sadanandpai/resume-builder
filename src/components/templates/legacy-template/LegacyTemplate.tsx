import React from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { getIcon } from "../../common/icons";

import { Intro } from "../professional-template/features/Intro";
import { Description } from "../professional-template/features/Description";
import { UnratedSection } from "../professional-template/features/RatedSection";
import { Exposure } from "../professional-template/features/UnratedSection";
import { Exp } from "../professional-template/features/Exp";
import { EduSection } from "../professional-template/features/EduSection";
import { ListSection } from "../professional-template/features/ListSection";

import { Separator } from "./core/Separator";
import { SectionHeader } from "./core/SectionHeader";

import { MdWork } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";

import { MdPermIdentity } from "react-icons/md";
import { AiOutlineAim } from "react-icons/ai";
import { BsBook } from "react-icons/bs";
import { GrStatusGood } from "react-icons/gr";
import { IoGitBranch } from "react-icons/io5";
import { MdBuild } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import {
  useIntro,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from "../../stores/data.store";

const GridContainer = styled.div`
  margin: auto;
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 10px 1fr;
`;

const Divider = styled.div`
  height: 100%;
  max-width: 3px;
  background-color: #007bff;
`;

const GridColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

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
        <Intro data={intro} />

        <Exp
          icon={getIcon("exp")}
          title={experience.title}
          companies={experience.companies}
        />
        <Separator />
        <SectionHeader
          Icon={getIcon("key projects / involvements")}
          title={keyProjects.title}
        />
        <ListSection items={keyProjects.items} />
        <Separator />
        <SectionHeader
          Icon={getIcon(keyProjects.title)}
          title={keyProjects.title}
        />
        <ListSection
          icon={getIcon(certificates.title)}
          title={certificates.title}
          items={certificates.items}
        />
      </GridColumn>

      <Divider />

      <GridColumn>
        <SectionHeader
          Icon={getIcon(intro.about.description)}
          title={intro.about.title}
        />
        <Description description={intro.about.description} />
        <Separator />
        <SectionHeader
          Icon={getIcon(intro.objective.title)}
          title={intro.objective.title}
        />
        <Description description={intro.objective.description} />
        <Separator />
        <SectionHeader
          Icon={getIcon(technical.title)}
          title={technical.title}
        />
        <UnratedSection items={technical.items} />
        <Separator />
        <SectionHeader Icon={getIcon(exposure.title)} title={exposure.title} />
        <Exposure items={exposure.items} />
        <SectionHeader
          Icon={getIcon(methodology.title)}
          title={methodology.title}
        />
        <Exposure items={methodology.items} />
        <Separator />
        <SectionHeader Icon={getIcon(tools.title)} title={tools.title} />
        <Exposure items={tools.items} />
        <Separator />
        <SectionHeader
          Icon={getIcon(education.title)}
          title={education.title}
        />
        <EduSection items={education.items} />
      </GridColumn>
    </GridContainer>
  );
}
