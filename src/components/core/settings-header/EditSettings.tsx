import React from "react";
import styled from "styled-components";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Checkbox, Collapse as AntCollapse, Input as AntInput, Button as AntButton } from "antd";
import { Flex } from "../../common/styles";

const { Panel } = AntCollapse;

const Topic = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1b253e;
  margin-bottom: 7px;
`;

const SubTopic = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  color: #1b253e;
  margin-bottom: 7px;
`;

const Wrapper = styled.div`
  margin: 8px 0;
`;

const InputWrap = styled.div`
  position: relative;
  border-radius: 3px;
  padding: 0.625rem;
  border: 1px solid #e0e0e0;
  background: #eff1f5;
`;

const Input = styled(AntInput)`
  border: 1px solid #d5d5d5;
  height: 2.625rem;
  padding: 0.625rem;
  max-width: 100%;
  background: #fff;
  color: #000;
  border-radius: 2px;
  margin-bottom: 5px;
`;

const PrimaryButton = styled(AntButton)`
  border: 1px solid #09b3af;
  border-radius: 2px;
  background: #09b3af;
  color: #fff;
`;

const FullButton = styled(AntButton)`
  border: 1px solid #09b3af;
  border-radius: 2px;
  background: #09b3af;
  color: #fff;
  width: 100%;
`;

const Collapse = styled(AntCollapse)`
  .ant-collapse-content-box {
    background: #eff1f5;
  }
`;

const DeleteIcon = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
`;

export const EditSettings = () => {
  return (
    <>
      <Collapse defaultActiveKey={["6"]}>
        <Panel header="About me" key="1">
          <Wrapper>
            <Topic>Profile</Topic>
            <InputWrap>
              <Input />
              <PrimaryButton>Upload</PrimaryButton>
            </InputWrap>
          </Wrapper>
          <Wrapper>
            <Topic>Name</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Role</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Email</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Location</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Mobile</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Experience</Topic>
            <Input />
          </Wrapper>
          <Wrapper>
            <Topic>Link</Topic>
            <Input />
          </Wrapper>
        </Panel>
        <Panel header="Experience" key="2">
          <Wrapper>
            <InputWrap>
              <SubTopic>Company</SubTopic>
              <Input />
              <SubTopic>Role</SubTopic>
              <Input />
              <Flex jc="space-between" ai="center" rGap="10px" cGap="10px">
                <div>
                  <SubTopic>Start</SubTopic>
                  <Input placeholder="Start Year" />
                </div>
                <div>
                  <SubTopic>End</SubTopic>
                  <Input placeholder="Datepicker" />
                </div>
                <div>
                  <Checkbox>Enable</Checkbox>
                </div>
              </Flex>
              <SubTopic>Description</SubTopic>
              <Input />
              <DeleteIcon>
                <DeleteOutlined />
              </DeleteIcon>
            </InputWrap>
          </Wrapper>
          <FullButton icon={<PlusOutlined />}>Add Block</FullButton>
        </Panel>
        <Panel header="Projects" key="3">
          <Wrapper>
            <Topic>Projects</Topic>
          </Wrapper>
        </Panel>
        <Panel header="Certificates" key="4">
          <Wrapper>
            <Topic>Certificates</Topic>
          </Wrapper>
        </Panel>
        <Panel header="Objective" key="5">
          <Wrapper>
            <Topic>Description</Topic>
            <Input />
          </Wrapper>
        </Panel>
        <Panel header="Expertise" key="6">
          <Wrapper>
            <InputWrap>
              <SubTopic>Label</SubTopic>
              <Input />
              <Flex jc="space-between" ai="center" rGap="10px" cGap="10px">
                <div>
                  <SubTopic>Rating</SubTopic>
                  <Input />
                </div>
                <div>
                  <Checkbox>Enable</Checkbox>
                </div>
              </Flex>
              <DeleteIcon>
                <DeleteOutlined />
              </DeleteIcon>
            </InputWrap>
          </Wrapper>
          <Wrapper>
            <InputWrap>
              <SubTopic>Label</SubTopic>
              <Input placeholder="Label" />
              <Flex jc="space-between" ai="center" rGap="10px" cGap="10px">
                <div>
                  <SubTopic>Rating</SubTopic>
                  <Input />
                </div>
                <div>
                  <Checkbox>Enable</Checkbox>
                </div>
              </Flex>
              <DeleteIcon>
                <DeleteOutlined />
              </DeleteIcon>
            </InputWrap>
          </Wrapper>
          <FullButton icon={<PlusOutlined />}>Add Block</FullButton>
        </Panel>
      </Collapse>
    </>
  );
};
