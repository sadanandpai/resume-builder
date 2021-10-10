import React, { useState } from "react";
import styled from "styled-components";
import { Flex, FlexCol, FlexVC } from "../../../common/styles";
import { getIcon } from "../../../common/icons";
import Color from "color";

const Role = styled.h3`
  color: ${(props) => Color(props.theme.primaryColor).alpha(0.75).toString()};
  margin-bottom: 0;
  font-weight: 600;
`;

export function Intro({ data }: any) {
  let experience = null;

  if (data.experience) {
    experience = Object.values(data.experience)
      .filter((v) => typeof v !== "function")
      .map((exp: any, ind: number) => (
        <div key={exp?.type}>
          {exp?.type}:&nbsp;
          <strong>{exp?.years}</strong>
        </div>
      ));
  }

  return (
    <Flex jc="space-between">
      <FlexCol rGap="5px">
        <Role>{data.role}</Role>
        {experience}
      </FlexCol>

      <FlexCol jc="flex-end" rGap="5px">
        {data.mobile ? <Contact icon={getIcon("mobile")} value={data.mobile} />: null }
        {data.email ? <Contact icon={getIcon("email")} value={data.email} />: null }
        {data.location ? <Contact icon={getIcon("location")} value={data.location} />: null }
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
