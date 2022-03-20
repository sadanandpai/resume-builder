import React from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Input = styled(TextField)`
  max-width: 100%;
  background: white;
  color: white;
  margin-bottom: 5px;
  width: 100%;
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
