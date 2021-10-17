import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { SOCIAL_METADATA } from 'src/core/meta-data/input_metadata';
import { useSocial } from 'src/stores/data.store';

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Topic = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 7px;
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

export function SocialEdit() {
  const social = useSocial((state: any) => state);
  const setField = useSocial((state: any) => state.setField);

  return (
    <>
      {SOCIAL_METADATA?.metadata.map((metadata) => (
        <Wrapper key={metadata.label}>
          <Topic>{metadata.label}</Topic>
          <Input value={social[metadata.value]} data-label={metadata.value} onChange={setField} />
        </Wrapper>
      ))}
    </>
  );
}
