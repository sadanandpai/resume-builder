import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Input as AntInput, Switch } from 'antd';
import shallow from 'zustand/shallow';

import { useItems } from 'src/stores/settings.store';
import { INTRO_METADATA } from 'src/core/meta-data/input_metadata';
import { BlockField } from 'src/core/widgets/BlockField';
import { useIntro } from 'src/stores/data.store';

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

export function IntroEdit() {
  const intro = useIntro((state: any) => state);
  const { setField, setBlockField } = useIntro(
    (state: any) => ({ setField: state.setField, setBlockField: state.setBlockField }),
    shallow
  );

  const isPhotoDisplayed = useItems((state: any) => state.isPhotoDisplayed);
  const setIsPhotoDisplayed = useItems((state: any) => state.setIsPhotoDisplayed);

  const editFields: any = {
    Input: ({ value, onChange }: any) => (
      <Input value={intro[value]} data-label={value} onChange={onChange} />
    ),
    Block: ({ fields, label, onChange }: any) => (
      <BlockField
        fields={fields}
        enableAdd={false}
        rootLabel={label}
        rootData={intro[label]}
        onChange={onChange}
      />
    ),
  };

  return (
    <>
      <Switch checked={isPhotoDisplayed} onChange={setIsPhotoDisplayed} size="small" />
      {INTRO_METADATA?.metadata.map((metadata, indx) =>
        metadata?.type !== 'Block' ? (
          <Wrapper key={metadata.label}>
            <Topic>{metadata.title}</Topic>
            {editFields[metadata.type]({ value: metadata.value, onChange: setField })}
          </Wrapper>
        ) : (
          <Fragment key={indx}>
            {editFields[metadata.type]({
              fields: metadata.fields,
              label: metadata.value,
              onChange: setBlockField,
            })}
          </Fragment>
        )
      )}
    </>
  );
}
