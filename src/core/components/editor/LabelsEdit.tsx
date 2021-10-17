import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Input = styled(AntInput)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;

export function LabelsEdit({ state, update }: any) {
  return (
    <>
      {state.map((label, index: number) => (
        <Wrapper key={index}>
          <Input
            placeholder={label}
            value={label}
            onChange={(event) => update(index, event.target.value)}
          />
        </Wrapper>
      ))}
    </>
  );
}
