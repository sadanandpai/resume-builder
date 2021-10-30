import React from 'react';
import styled from 'styled-components';
import shallow from 'zustand/shallow';
import {
  useEducation,
  useWork,
  useSkills,
  useLabels,
  useIntro,
  useVolunteer,
  useAwards,
} from 'src/stores/data.store';
import {
  INTRO_METADATA,
  EDU_METADATA,
  EXP_METADATA,
  SOCIAL_METADATA,
  VOLUNTEERING_METADATA,
  AWARDS_METADATA,
} from 'src/core/meta-data/input_metadata';
import { SkillsEdit } from './SkillsEdit';
import { TimelineEdit } from './TimelineEdit';
import { ActivitiesEdit } from './ActivitiesEdit';
import { LabelsEdit } from './LabelsEdit';
import { IntroEdit } from './IntroEdit';
import { SocialEdit } from './SocialEdit';

const Divider = styled.div`
  height: 2px;
  background: white;
  margin: 20px 0;
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  background: #222;
`;

const Heading = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-bottom: 0;
`;

export const IntroEditor = () => {
  const introState = useIntro((state: any) => state.intro);
  const update = useIntro((state: any) => state.update);

  return (
    <Container>
      <Heading>Intro</Heading>
      <IntroEdit state={introState} METADATA={INTRO_METADATA} update={update} />
      <Divider />
    </Container>
  );
};

export const SocialEditor = () => {
  const profiles = useIntro((state: any) => state.intro.profiles);
  const updateProfiles = useIntro((state: any) => state.updateProfiles);

  return (
    <Container>
      <Heading>Social</Heading>
      <SocialEdit state={profiles} METADATA={SOCIAL_METADATA} update={updateProfiles} />
    </Container>
  );
};

export const ActivitiesEditor = () => (
  <Container>
    <Heading>Activities</Heading>
    <ActivitiesEdit />
  </Container>
);

export const LabelsEditor = () => {
  const labelsState = useLabels((state: any) => state.labels);
  const update = useLabels((state: any) => state.update);

  return (
    <Container>
      <Heading>Template Labels</Heading>
      <LabelsEdit state={labelsState} update={update} />
    </Container>
  );
};

export const EduEditor = () => {
  const education = useEducation((state: any) => state.education);
  const [add, update, purge, changeOrder] = useEducation(
    (state: any) => [state.add, state.update, state.purge, state.changeOrder],
    shallow
  );

  return (
    <Container>
      <Heading>Education</Heading>
      <TimelineEdit
        METADATA={EDU_METADATA}
        itemList={education}
        identifier="studyType"
        operations={{ update, add, purge, changeOrder }}
      />
    </Container>
  );
};

export const ExerienceEditor = () => {
  const companies = useWork((state: any) => state.companies);
  const [add, update, purge, changeOrder] = useWork(
    (state: any) => [state.add, state.update, state.purge, state.changeOrder],
    shallow
  );

  return (
    <Container>
      <Heading>Experience</Heading>
      <TimelineEdit
        METADATA={EXP_METADATA}
        itemList={companies}
        identifier="name"
        operations={{ update, add, purge, changeOrder }}
      />
    </Container>
  );
};

const VolunteerEditor = () => {
  const volunteer = useVolunteer((state: any) => state.volunteer);
  const [add, update, purge, changeOrder] = useVolunteer(
    (state: any) => [state.add, state.update, state.purge, state.changeOrder],
    shallow
  );

  return (
    <Container>
      <Heading>Volunteering</Heading>
      <TimelineEdit
        METADATA={VOLUNTEERING_METADATA}
        itemList={volunteer}
        identifier="organization"
        operations={{ update, add, purge, changeOrder }}
      />
    </Container>
  );
};

const AwardsEditor = () => {
  const awards = useAwards((state: any) => state.awards);
  const [add, update, purge, changeOrder] = useAwards(
    (state: any) => [state.add, state.update, state.purge, state.changeOrder],
    shallow
  );

  return (
    <Container>
      <Heading>Awards</Heading>
      <TimelineEdit
        METADATA={AWARDS_METADATA}
        itemList={awards}
        identifier="title"
        operations={{ update, add, purge, changeOrder }}
      />
    </Container>
  );
};

export const ForteEditor = () => (
  <>
    <AwardsEditor />
    <VolunteerEditor />
  </>
);

export const SkillEditor = ({ type, hasRating = false }: { type: string; hasRating: boolean }) => {
  const [skillList, add, update, purge, changeOrder] = useSkills(
    (state: any) => [state[type], state.add, state.update, state.purge, state.changeOrder],
    shallow
  );

  return (
    <Container>
      <Heading>{type.toUpperCase()}</Heading>
      <SkillsEdit
        type={type}
        hasRating={hasRating}
        skills={skillList}
        addSkill={add}
        updateSkill={update}
        deleteSkill={purge}
        changeOrder={changeOrder}
      />
      <Divider />
    </Container>
  );
};

export const SkillsEditor = () => (
  <>
    <SkillEditor type="languages" hasRating />
    <SkillEditor type="frameworks" hasRating />
    <SkillEditor type="technologies" hasRating={false} />
    <SkillEditor type="libraries" hasRating={false} />
    <SkillEditor type="databases" hasRating={false} />
    <SkillEditor type="practices" hasRating={false} />
    <SkillEditor type="tools" hasRating={false} />
  </>
);
