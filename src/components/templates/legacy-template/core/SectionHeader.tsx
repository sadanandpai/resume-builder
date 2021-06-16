import React from "react";
import styled from "styled-components";

export const Section = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #007bff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const TitleHolder = styled.div`
  height: 27px;
`;

export function SectionHeader({ title, Icon }:any) {
  return (
    <Section>
      {Icon}
      <TitleHolder>{title}</TitleHolder>
    </Section>
  );
}
