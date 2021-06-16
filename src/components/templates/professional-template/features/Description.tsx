import React from "react";
import styled from "styled-components";
import ReactMarkdown from 'react-markdown'

import { Section } from "../core/Section";

const RoundedImage = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside:circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${(props) => props.theme.fontColor};
`

export function Description({icon, title, description, photo}: any) {
  return (
    <Section icon={icon} title={title}>
      {photo && <RoundedImage src={photo} />}
      <ReactMarkdown>{description}</ReactMarkdown>
    </Section>
  );
}
