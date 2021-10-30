import React from 'react';
import styled from 'styled-components';
import { getIcon } from 'src/styles/icons';

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 10px;

  a {
    &:not(:last-of-type) {
      margin-right: 10px;
    }
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export default function Social({ data }: any) {
  return (
    <Container>
      {Object.entries(data)
        .filter((value) => typeof value[1] !== 'function' && value[1] !== '')
        .map((icon: any) => (
          <a href={icon[1]} key={icon[1].split('/')}>
            {getIcon(icon[0])}
          </a>
        ))}
    </Container>
  );
}
