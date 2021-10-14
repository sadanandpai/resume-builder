import React from "react";
import styled from "styled-components";
import { IntroEdit } from "../../containers/components/IntroEdit";

const Divider = styled.div`
  height: 1px;
  background: #424242;
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

export const EditSettings = () => (
  <Container>
    <Heading>Intro</Heading>
    <IntroEdit />
    <Divider />
  </Container>
);
