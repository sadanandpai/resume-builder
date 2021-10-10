import React from "react";
import styled from "styled-components";
import { Timeline } from "antd";

import { CompanyHeader } from "../core/Company";
import { List } from "../core/List";

const FlexTimeline = styled(Timeline)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${(props: any) => props.theme.fontColor};
`;

const TimelineItem = styled(FlexTimeline.Item)`
  padding-bottom: 0;
  flex-grow: 1;
  padding-bottom: 20px;

  :last-child {
    flex-grow: 0;
    padding-bottom: 0;
  }
`;

export function Exp({ styles, companies }: any) {
  return (
    <FlexTimeline style={styles}>
      {companies?.map((company: any, index: any) => {
        return (
          <TimelineItem key={index}>
            <CompanyHeader company={company} />
            <List items={company.description} />
          </TimelineItem>
        );
      })}
    </FlexTimeline>
  );
}
