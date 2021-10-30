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

export default function Social({ profiles }: any) {
  return (
    <Container>
      {profiles
        .filter((profile) => profile.url)
        .map((profile: any) => (
          <a href={profile.url} key={profile.url}>
            {getIcon(profile.network)}
          </a>
        ))}
    </Container>
  );
}
