import React from "react";
import styled from "styled-components";
import { Timeline } from "antd";
import { List } from "../list/List";
import { Flex } from "../../../components/common/styles";

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

const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const CompanyRole = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`;

const CompanyExp = styled.div`
  font-style: italic;
  font-size: 0.6rem;
`;

export function CompanyHeader(props: any) {
  return (
    <>
      <Flex jc="space-between" ai="flex-end" style={{ lineHeight: "initial" }}>
        <CompanyName>{props.company.name}</CompanyName>
        <CompanyExp>{props.company.years}</CompanyExp>
      </Flex>
      <Flex jc="space-between" ai="flex-end">
        <CompanyRole>{props.company.role}</CompanyRole>
        <CompanyExp>{props.company.expYears}</CompanyExp>
      </Flex>
    </>
  );
}

export function Exp({ companies, styles }: any) {
  return (
    <FlexTimeline style={styles}>
      {companies.map((company: any, index: any) => {
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
