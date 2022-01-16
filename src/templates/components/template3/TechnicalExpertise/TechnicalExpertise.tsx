import React from 'react';
import styled from 'styled-components';
import { Progress } from 'antd';

const Container = styled.section``;

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
        <Progress strokeColor={{}} percent={(tech.level * 100) / 5} showInfo={false} />
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
