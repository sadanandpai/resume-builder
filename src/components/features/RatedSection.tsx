import React from "react";
import styled from "styled-components";
import { Flex } from "../common/styles";
import { Section } from "../core/Section";

const Badge = styled.span`
  padding: 4px;
  font-size: 98%;
  font-weight: 500;
  border: 1px solid rgba(165, 42, 42, 0.4);
  border-radius: 4px;
`;

export function Exposure({ icon, title, items }: any) {
  return (
    <Section title={title} icon={icon}>
      <Flex cGap="10px" rGap="10px" style={{ flexWrap: "wrap" }}>
        {items.map((value: any, index: any) => (
          <Badge key={index}>{value}</Badge>
        ))}
      </Flex>
    </Section>
  );
}
