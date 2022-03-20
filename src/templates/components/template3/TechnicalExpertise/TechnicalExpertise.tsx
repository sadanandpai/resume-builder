import React from 'react';
import styled from '@emotion/styled';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

const Container = styled.section``;

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 5,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'lightgrey',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}));

interface TechnologyProps {
  tech: {
    name: string;
    level: number;
  };
}

const TechnologyContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;

  .name {
    font-weight: 600;
    flex: 1;
  }

  .rating {
    flex: 0 0 60%;
    text-align: right;
  }
`;

function Technology({ tech }: TechnologyProps) {
  return (
    <TechnologyContainer>
      <p className="name">{tech.name}</p>
      <div className="rating">
        {/* percentage = rating * 100 / max rating */}
        {/* <Progress strokeColor={{}} percent={(tech.level * 100) / 5} showInfo={false} /> */}
        <BorderLinearProgress variant="determinate" value={(tech.level * 100) / 5} />
      </div>
    </TechnologyContainer>
  );
}

export default function TechnicalExpertise({ data }: any) {
  if (!data?.length) return null;
  return (
    <Container>
      {data.map((tech, i) => (
        <Technology key={i} tech={tech} />
      ))}
    </Container>
  );
}
