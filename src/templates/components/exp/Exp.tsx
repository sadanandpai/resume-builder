import React from 'react';
import styled from '@emotion/styled';
import { Flex } from 'src/styles/styles';
import MarkdownIt from 'markdown-it';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

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

const MyTimeline = styled(Timeline)`
  padding: 0;
`;

const MyTimelineItem = styled(TimelineItem)`
  ::before {
    display: none;
  }

  ul {
    padding-left: 1rem;
  }
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
  return companies.map((company: any, index: number) => (
    <MyTimeline key={`${company.name}-${index}`}>
      <MyTimelineItem>
        <TimelineSeparator>
          <TimelineDot variant="outlined" color="primary" />
          {index !== companies.length - 1 && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <CompanyHeader company={company} />
          <div dangerouslySetInnerHTML={{ __html: mdParser.render(company.summary ?? '') }} />
        </TimelineContent>
      </MyTimelineItem>
    </MyTimeline>
  ));
}
