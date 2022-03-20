import React from 'react';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';

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

export function SocialEdit({ METADATA, state, update }: any) {
  return METADATA.map((metadata) => (
    <Wrapper key={metadata.label}>
      <Input
        variant="filled"
        placeholder="username"
        label={metadata.label + ' username'}
        value={state.find((value) => value.network === metadata.value)?.username}
        onChange={(event) => update(metadata.value, 'username', event.target.value)}
      />
      <Input
        variant="filled"
        placeholder="url"
        label={metadata.label + ' url'}
        value={state.find((value) => value.network === metadata.value)?.url}
        onChange={(event) => update(metadata.value, 'url', event.target.value)}
      />
    </Wrapper>
  ));
}
