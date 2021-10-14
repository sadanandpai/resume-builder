import React from "react";
import Color from "color";
import styled from "styled-components";
import { Flex, FlexCol, FlexVC } from "../../../assets/styles/styles";
import { getIcon } from "../../../core/common/icons";

const Role = styled.h3`
  color: ${(props) => Color(props.theme.primaryColor).alpha(0.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;

const Contact = ({ icon, value }: any) => (
  <FlexVC jc="flex-end" cGap="8px">
    {icon}
    <span>{value}</span>
  </FlexVC>
);

export function Intro({ data }: any) {
  return (
    <Flex jc="space-between">
      <FlexCol rGap="5px">
        <Role>{data.role}</Role>
        <div>
          {data.experience.relExpLabel}:&nbsp;
          <strong>{data.experience.relExp}</strong>
        </div>
        <div>
          {data.experience.expLabel}:&nbsp;{data.experience.exp}
        </div>
      </FlexCol>

      <FlexCol jc="flex-end" rGap="5px">
        <Contact icon={getIcon("mobile")} value={data.mobile} />
        <Contact icon={getIcon("email")} value={data.email} />
        <Contact icon={getIcon("location")} value={data.location} />
      </FlexCol>
    </Flex>
  );
}
