import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

const EducationContainer = styled.section`
  &:not(:last-of-type) {
    margin-bottom: 10px;
  }

  line-height: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__course {
      font-size: 12px;
      font-weight: 600;
    }
  }

  .institution {
    font-weight: 600;
  }

  .score {
    span {
      font-weight: 600;
    }
  }
`;

function EducationEntry({ education }: any) {
  return (
    <EducationContainer>
      <div className="header">
        <p className="header__course">
          {education.studyType}, {education.area}
        </p>
        <p className="header__year">
          {education.startDate} {education.endDate ? ` - ${education.endDate}` : ''}
        </p>
      </div>
      <p className="institution">{education.institution}</p>
      <p className="score">
        Secured: <span>{education.score}</span>
      </p>
    </EducationContainer>
  );
}

export default function Education({ data }: any) {
  if (!data?.length) return null;

  return (
    <Container>
      {data.map((education, i) => (
        <EducationEntry key={i} education={education} />
      ))}
    </Container>
  );
}
