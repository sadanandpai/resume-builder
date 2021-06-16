import React, { useState } from "react";
import shallow from "zustand/shallow";
import styled from "styled-components";
import { FlexCol } from "../../common/styles";
import { getIcon } from "../../common/icons";

import { Intro } from "./features/Intro";
import { Description } from "./features/Description";
import { UnratedSection } from "./features/RatedSection";
import { Exposure } from "./features/UnratedSection";
import { Exp } from "./features/Exp";
import { EduSection } from "./features/EduSection";
import { ListSection } from "./features/ListSection";
import {
  useIntro,
  useExp,
  useSkills,
  useAchievements,
  useEducation,
} from "../../stores/data.store";

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
  return (
    <>
      <LeftSection>
        <Intro data={intro} />
        <Exp
          icon={getIcon("exp")}
          title={experience.title}
          companies={experience.companies}
        />
        <ListSection
          icon={getIcon("key")}
          title={keyProjects.title}
          items={keyProjects.items}
        />
        <ListSection
          icon={getIcon("certificates")}
          title={certificates.title}
          items={certificates.items}
        />
      </LeftSection>

      <RightSection>
        <Description
          icon={getIcon("about")}
          title={intro.about.title}
          photo={intro.photo}
          description={intro.about.description}
        />
        <Description
          icon={getIcon("objective")}
          title={intro.objective.title}
          description={intro.objective.description}
        />
        <UnratedSection
          icon={getIcon("technical")}
          title={technical.title}
          items={technical.items}
        />
        <Exposure
          icon={getIcon("skills")}
          title={exposure.title}
          items={exposure.items}
        />
        <Exposure
          icon={getIcon("methodology")}
          title={methodology.title}
          items={methodology.items}
        />
        <Exposure
          icon={getIcon("tools")}
          title={tools.title}
          items={tools.items}
        />
        <EduSection
          icon={getIcon("education")}
          title={education.title}
          items={education.items}
        />
      </RightSection>
    </>
  );
}
