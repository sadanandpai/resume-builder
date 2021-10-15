import React from 'react';
import styled from 'styled-components';
import { IntroEdit } from 'src/core/components/editor/IntroEdit';
import { SocialEdit } from 'src/core/components/editor/SocialEdit';

const Divider = styled.div`
  height: 2px;
  background: white;
`;

const Container = styled.div`
  display: grid;
  gap: 1rem;
  height: 100vh;
  background: #222;
`;

const Heading = styled.h2`
  color: #fff;
  font-size: 1.5rem;
  line-height: 2.5rem;
  margin-bottom: 0;
`;

export const Editor = () => (
  <Container>
    <Heading>Intro</Heading>
    <IntroEdit />
    <Divider />
    <Heading>Social</Heading>
    <SocialEdit />
    <Divider />
  </Container>
);
