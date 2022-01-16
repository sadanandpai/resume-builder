import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';

import {
  useIntro,
  useWork,
  useSkills,
  useActivities,
  useEducation,
  useLabels,
} from 'src/stores/data.store';

/* Template 3 components */
import {
  Intro,
  TechnicalExpertise,
  UnratedCapsules,
  Education,
  Social,
} from 'src/templates/components/template3';
import { Section } from 'src/templates/components/template3/shared';

/* Common comps */
import { Exp } from 'src/templates/components/exp/Exp';
import { Description } from 'src/templates/components/description/Description';

const ResumeContainer = styled.div`
  height: 100%;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.backgroundColor};

  .body {
    display: flex;
    margin-top: 10px;
    &__section {
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      min-height: 30vh;
      &--left {
        margin: 0 5px 0 10px;
        flex: 0 0 40%;
      }
      &--right {
        flex: 1;
        margin: 0 10px 0 5px;
      }
    }
  }

  @media print {
    border: none;
  }
`;

export default function Template3() {
  // Uncomment below lines to access data

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
    <ResumeContainer>
      <Intro name="Varchasvi" intro={intro} />
      <Social profiles={intro.profiles} />
      <div className="body">
        <div className="body__section body__section--left">
          <Section title={labels[3]} icon="identity">
            <p>{intro.summary}</p>
          </Section>

          <Section title={labels[4]} icon="career">
            <p>{intro.objective}</p>
          </Section>

          <Section icon="expert" title={labels[5]}>
            <TechnicalExpertise data={[...languages, ...frameworks]} />
          </Section>

          <Section icon="skill" title={labels[6]}>
            <UnratedCapsules data={[...technologies, ...libraries, ...databases]} />
          </Section>

          <Section icon="branch" title={labels[7]}>
            <UnratedCapsules data={practices} />
          </Section>

          <Section icon="tool" title={labels[8]}>
            <UnratedCapsules data={tools} />
          </Section>

          <Section icon="education" title={labels[9]}>
            <Education data={education} />
          </Section>
        </div>

        <div className="body__section body__section--right">
          <Section icon="work" title={labels[0]}>
            <Exp companies={experience.companies} />
          </Section>

          <Section icon="key" title={labels[1]}>
            <Description description={involvements} />
          </Section>

          <Section icon="certificate" title={labels[2]}>
            <Description description={achievements} />
          </Section>
        </div>
      </div>
    </ResumeContainer>
  );
}
