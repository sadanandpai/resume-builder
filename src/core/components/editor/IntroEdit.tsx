import React from 'react';
import TextField from '@mui/material/TextField';
import { MarkDownField } from 'src/core/widgets/MarkdownField';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Input = styled(TextField)`
  max-width: 100%;
  background: white;
  color: #fff;
  margin-bottom: 5px;
  width: 100%;
`;

export function IntroEdit({ METADATA, state, update }: any) {
  return (
    <>
      {METADATA.map((metadata) => (
        <Wrapper key={metadata.label}>
          {metadata.type === 'Input' ? (
            <Input
              variant="filled"
              label={metadata.value}
              value={
                metadata.value.includes('.')
                  ? state[metadata.value.split('.')[0]][metadata.value.split('.')[1]]
                  : state[metadata.value]
              }
              inputProps={{ 'data-label': metadata.value }}
              data-label={metadata.value}
              onChange={(event) => update(event.target.dataset.label, event.target.value)}
            />
          ) : (
            <MarkDownField
              value={state[metadata.value]}
              setValue={(text) => update(metadata.value, text)}
            />
          )}
        </Wrapper>
      ))}
    </>
  );
}
