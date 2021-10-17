import React, { Fragment } from 'react';
import styled from 'styled-components';
// import { Input as AntInput } from 'antd';
// import { ACHIEVEMNT_METADATA } from 'src/core/meta-data/input_metadata';
import { useAchievements } from 'src/stores/data.store';
import { MarkDownField } from 'src/core/widgets/MarkdownField';

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Topic = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 7px;
`;

export function AwardsEdit() {
  const { projects, awards } = useAchievements((state: any) => state);
  const update = useAchievements((state: any) => state.update);

  return (
    <>
      <Wrapper>
        <Topic>Projects</Topic>
        <MarkDownField value={projects} setValue={(text) => update('projects', text)} />
      </Wrapper>

      <Wrapper>
        <Topic>Awards</Topic>
        <MarkDownField value={awards} setValue={(text) => update('awards', text)} />
      </Wrapper>
    </>
  );
}
