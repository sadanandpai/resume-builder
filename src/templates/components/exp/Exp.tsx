import React from 'react';
import styled from 'styled-components';
import { Timeline } from 'antd';
import { Flex } from 'src/styles/styles';
import MarkdownIt from 'markdown-it';

const FlexTimeline = styled(Timeline)`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  height: 100%;
  padding-top: 15px;
  color: ${(props: any) => props.theme.fontColor};

  ul {
    padding-left: 16px;
    margin-bottom: 0;
    font-size: 0.8rem;
  }
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

const mdParser = new MarkdownIt(/* Markdown-it options */);

export function CompanyHeader({ company }: any) {
  return (
    <>
      <Flex jc="space-between" ai="flex-end" style={{ lineHeight: 'initial' }}>
        <CompanyName>{company.name}</CompanyName>
        <CompanyExp>
          {company.startDate} - {company.endDate}
        </CompanyExp>
      </Flex>
      <Flex jc="space-between" ai="flex-end">
        <CompanyRole>{company.position}</CompanyRole>
        <CompanyExp>{company.years}</CompanyExp>
      </Flex>
    </>
  );
}

export function Exp({ companies, styles }: any) {
  return (
    <FlexTimeline style={styles}>
      {companies.map((company: any, index: number) => (
        <TimelineItem key={`${company.name}-${index}`}>
          <CompanyHeader company={company} />
          <div dangerouslySetInnerHTML={{ __html: mdParser.render(company.summary ?? '') }} />
        </TimelineItem>
      ))}
    </FlexTimeline>
  );
}
