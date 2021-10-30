import React from 'react';
import styled from 'styled-components';
import { Flex } from 'src/styles/styles';

const Education = styled.div`
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.secondaryColor};
    padding-bottom: 10px;
    margin-bottom: 10px;
  }
`;

const Degree = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
`;

const Specialization = styled.div`
  font-weight: 400;
  font-size: 0.7rem;
`;

export function EduSection({ education }: any) {
  if (!education) return null;

  return education.map((data: any) => (
    <Education key={data.studyType}>
      <Flex jc="space-between">
        <Degree>{data.studyType}</Degree>
        <em>
          {data.startDate} - {data.endDate}
        </em>
      </Flex>

      <Specialization>{data.area}</Specialization>
      <Flex jc="space-between">
        <div>{data.institution}</div>
        <em>{data.score}</em>
      </Flex>
    </Education>
  ));
}
