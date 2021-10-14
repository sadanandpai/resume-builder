import React from 'react';
import styled from 'styled-components';
import { Flex } from 'src/assets/styles/styles';

const Degree = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
`;

const Specialization = styled.div`
  font-weight: 400;
  font-size: 0.7rem;
`;

export function EduSection({ items }: any) {
  if (!items) return null;

  return items.map((data: any) => (
    <div key={data.degree}>
      <Flex jc="space-between">
        <Degree>{data.degree}</Degree>
        <em>{data.years}</em>
      </Flex>

      <Specialization>{data.specialization}</Specialization>
      <Flex jc="space-between">
        <div>{data.institution}</div>
        <em>{data.grade}</em>
      </Flex>
    </div>
  ));
}
