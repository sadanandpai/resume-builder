import React from "react";
import styled from "styled-components";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Switch as AntSwitch,
  Input as AntInput,
  Button as AntButton,
  DatePicker as AntDatePicker,
} from "antd";

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

const Section = styled.section<{ size: string }>`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  width: ${(props) => (props.size === "sm" ? "150px" : "")};
  padding-right: 4px;
  margin-bottom: 8px;
  flex-grow: 1;
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

const inputList = {
  Input: <Input />,
  Datepicker: <DatePicker />,
};

export const InputBlock = ({ fields }: any) => {
  return (
    <>
      <InputWrap>
        <DataWrapper>
          <Paragraph>Dummy Corporation 1</Paragraph>
          <Paragraph>Senior Software Developer</Paragraph>
          <Paragraph>Apr 2021</Paragraph>
          <Paragraph>present</Paragraph>
          <Paragraph>
            - Use my extensive experience with front end development to define the structure and
            components for the project, making sure they are reusable <br /> - Keep the code quality
            high reviewing code from other developers and suggesting improvements <br /> - Interact
            with the designer to suggest changes and to make sure the view he has about the design
            is translated into actual functionality <br /> - E-commerce maintenance with
            Fastcommerce, a Brazilian e-commerce platform
          </Paragraph>
        </DataWrapper>
        <IconContainer>
          <ItemWrapper>
            <Switch size="small" />
          </ItemWrapper>
          <ItemWrapper>
            <EditOutlined style={{ color: "#1890ff", fontSize: "1rem" }} />
          </ItemWrapper>
          <ItemWrapper>
            <DeleteOutlined style={{ color: "#C34A36", fontSize: "1rem" }} />
          </ItemWrapper>
        </IconContainer>
      </InputWrap>

      <InputWrap>
        <Wrapper>
          {fields.map((item: any) => (
            <Section size={item.size}>
              <Topic>{item.label}</Topic>
              {inputList[item.type]}
            </Section>
          ))}
        </Wrapper>
        <FullButton icon={<PlusOutlined />}>Add</FullButton>
      </InputWrap>
    </>
  );
};
