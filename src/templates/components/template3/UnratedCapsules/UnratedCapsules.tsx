import React from 'react';
import styled from '@emotion/styled';
import { Flex } from 'src/styles/styles';

const Container = styled(Flex)`
  flex-wrap: wrap;
`;

const Skill = styled.section`
  margin: 4px 4px 0 0;
  font-weight: 600;
  border: 1px solid;
  border-color: ${(props: any) =>
    `${props.theme.colors.primaryColor} ${props.theme.colors.secondaryColor} ${props.theme.colors.secondaryColor} ${props.theme.colors.primaryColor}`};
  padding: 6px 8px;
  border-radius: 4px;
`;

export default function UnratedCapsules({ data }: any) {
  if (!data?.length) return null;

  return (
    <Container>
      {data.map((skill, i) => !!skill?.name && <Skill key={i}>{skill.name}</Skill>)}
    </Container>
  );
}
