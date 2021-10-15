import React from 'react';
import styled from 'styled-components';
import { IntroEdit } from 'src/core/components/editor/IntroEdit';
import { SocialEdit } from 'src/core/components/editor/SocialEdit';
import { RatedEdit } from './RatedEdit';
import { ExpEdit } from './ExpEdit';
import { InfoEdit } from './InfoEdit';

const Divider = styled.div`
  height: 2px;
  background: white;
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

export const IntroEditor = () => (
  <Container>
    <Heading>Intro</Heading>
    <IntroEdit />
    <Divider />
  </Container>
);

export const InfoEditor = () => (
  <Container>
    <Heading>Info</Heading>
    <InfoEdit />
    <Divider />
  </Container>
);

export const SocialEditor = () => (
  <Container>
    <Heading>Social</Heading>
    <SocialEdit />
    <Divider />
  </Container>
);

export const ExerienceEditor = () => (
  <Container>
    <Heading>Social</Heading>
    <ExpEdit />
    <Divider />
  </Container>
);

export const SkillsEditor = () => (
  <Container>
    <Heading>Skills</Heading>
    <RatedEdit />
    <Divider />
  </Container>
);
