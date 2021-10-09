import React from "react";
import styled from "styled-components";
import { Button as AntButton, Input as AntInput } from "antd";
import { useIntro } from "../../stores/data.store";

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Topic = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: #1b253e;
  margin-bottom: 7px;
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

export function IntroEdit() {
  const intro = useIntro((state: any) => state);
  const {setField, setExp} = useIntro((state: any) => ({setField: state.setField, setExp: state.setExp}), shallow);

  return (
    <>
      <Wrapper>
        <Topic>Profile</Topic>
        <InputWrap>
          <Input />
          <PrimaryButton>Upload</PrimaryButton>
        </InputWrap>
      </Wrapper>
      <Wrapper>
        <Topic>Name</Topic>
        <Input value={intro.name} data-label="name" onChange={setField} />
      </Wrapper>
      <Wrapper>
        <Topic>Role</Topic>
        <Input value={intro.role} data-label="role" onChange={setField} />
      </Wrapper>
      <Wrapper>
        <Topic>Email</Topic>
        <Input value={intro.email} data-label="email" onChange={setField} />
      </Wrapper>
      <Wrapper>
        <Topic>Location</Topic>
        <Input value={intro.location} data-label="location" onChange={setField} />
      </Wrapper>
      <Wrapper>
        <Topic>Mobile</Topic>
        <Input value={intro.mobile} data-label="mobile" onChange={setField} />
      </Wrapper>
      <Wrapper>
        <Topic>Relevant Exp label</Topic>
        <Input value={intro.experience[0].type} data-label="type-0" onChange={setExp} />
      </Wrapper>
      <Wrapper>
        <Topic>Relevant Exp</Topic>
        <Input value={intro.experience[0].years} data-label="years-0" onChange={setExp} />
      </Wrapper>
      <Wrapper>
        <Topic>Total Exp label</Topic>
        <Input value={intro.experience[1].type} data-label="type-1" onChange={setExp} />
      </Wrapper>
      <Wrapper>
        <Topic>Total Exp</Topic>
        <Input value={intro.experience[1].years} data-label="years-1" onChange={setExp} />
      </Wrapper>
    </>
  );
}
