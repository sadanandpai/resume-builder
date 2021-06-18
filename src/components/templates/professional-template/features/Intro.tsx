import React, { useState } from "react";
import styled from "styled-components";
import { Flex, FlexCol, FlexVC } from "../../../common/styles";
import { SectionIntro } from "../core/Section";
import { getIcon } from "../../../common/icons";
import Color from "color";

const Role = styled.h3`
  color: ${(props) => Color(props.theme.primaryColor).alpha(0.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;

export function Intro({ data }: any) {
  return (
      <Flex jc="space-between">
        <FlexCol rGap="5px">
          <Role>{data.role}</Role>
          <div>
            {data.experience[0].type}:&nbsp;
            <strong>{data.experience[0].years}</strong>
          </div>
          <div>
            {data.experience[1].type}:&nbsp;{data.experience[1].years}
          </div>
        </FlexCol>

        <FlexCol jc="flex-end" rGap="5px">
          <Contact icon={getIcon('mobile')} value={data.mobile} />
          <Contact icon={getIcon('email')} value={data.email} />
          <Contact icon={getIcon('location')} value={data.location} />
        </FlexCol>
      </Flex>
  );
}

const Contact = ({ icon, value }: any) => {
  return (
    <FlexVC jc="flex-end" cGap="8px">
      {icon}
      <span>{value}</span>
    </FlexVC>
  );
};
