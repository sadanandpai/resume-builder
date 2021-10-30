import React, { Fragment } from 'react';
import styled from 'styled-components';
// import { Input as AntInput } from 'antd';
// import { ACHIEVEMNT_METADATA } from 'core/meta-data/input_metadata';
import { useActivities } from 'src/stores/data.store';
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

export function ActivitiesEdit() {
  const { involvements, achievements } = useActivities((state: any) => state);
  const update = useActivities((state: any) => state.update);

  return (
    <>
      <Wrapper>
        <Topic>Involvements</Topic>
        <MarkDownField value={involvements} setValue={(text) => update('involvements', text)} />
      </Wrapper>

      <Wrapper>
        <Topic>Achievements</Topic>
        <MarkDownField value={achievements} setValue={(text) => update('achievements', text)} />
      </Wrapper>
    </>
  );
}
