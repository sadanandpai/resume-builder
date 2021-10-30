import React, { Fragment } from 'react';
import styled from 'styled-components';
import { PlusOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import {
  Switch as AntSwitch,
  Input as AntInput,
  Button as AntButton,
  DatePicker as AntDatePicker,
} from 'antd';

const FullButton = styled(AntButton)`
  border: 1px solid #1890ff;
  border-radius: 2px;
  background: #1890ff;
  color: #fff;
  width: 100%;
`;

const Switch = styled(AntSwitch)`
  background: #1890ff;
`;

const InputWrap = styled.div`
  position: relative;
  border-radius: 3px;
  width: 100%;
  padding: 0.625rem;
  border: 1px solid #424242;
  margin-bottom: 8px;
  background: #222;
`;

const Wrapper = styled.div`
  margin: 8px 0;
  display: flex;
  flex-wrap: wrap;
`;

const Topic = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
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

const DatePicker = styled(AntDatePicker)`
  border: 1px solid #222;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #424242;
  color: #fff;
  border-radius: 2px;
  margin-bottom: 5px;
`;

const DataWrapper = styled.div`
  display: grid;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
`;

const Paragraph = styled.p`
  color: #fff;
  margin-bottom: 8px;
`;

const ItemWrapper = styled.div`
  margin-right: 1rem;
  cursor: pointer;
`;

const Section = styled.section<{ size: string }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  width: ${(props) => (props.size === 'sm' ? '50%' : '')};
  padding-right: 4px;
  margin-bottom: 8px;
  flex-grow: 1;
`;

const inputList: any = {
  Input: ({ data, value, label, onChange }: any) => (
    <Input value={data[value]} data-label={`${label}-${value}`} onChange={onChange} />
  ),
  Datepicker: <DatePicker />,
};

export const BlockField = ({ fields, rootData, rootLabel, onChange, enableAdd = true }: any) => (
  <>
    {enableAdd ? (
      <InputWrap>
        <DataWrapper>
          <Paragraph>This list is empty.</Paragraph>
        </DataWrapper>
        <IconContainer>
          <ItemWrapper>
            <Switch size="small" />
          </ItemWrapper>
          <ItemWrapper>
            <EditOutlined style={{ color: '#1890ff', fontSize: '1rem' }} />
          </ItemWrapper>
          <ItemWrapper>
            <DeleteOutlined style={{ color: '#C34A36', fontSize: '1rem' }} />
          </ItemWrapper>
        </IconContainer>
      </InputWrap>
    ) : null}

    <InputWrap>
      <Wrapper>
        {fields.map((item: any) => (
          <Section size={item.size} key={item.label}>
            <Topic>{item.label}</Topic>
            {inputList[item.type]({
              data: rootData,
              value: item.value,
              label: rootLabel,
              onChange,
            })}
          </Section>
        ))}
      </Wrapper>
      {enableAdd ? <FullButton icon={<PlusOutlined />}>Add</FullButton> : null}
    </InputWrap>
  </>
);
