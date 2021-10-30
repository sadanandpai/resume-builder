import React from 'react';
import styled from 'styled-components';
import { getIcon } from 'src/styles/icons';

const SocialDiv = styled.div`
  padding: 10px;
  color: ${(props) => props.theme.fontColor};
  border-top: 2px solid ${(props) => props.theme.primaryColor};
  border-bottom: 2px solid ${(props) => props.theme.primaryColor};
  margin: 12px 0px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 0.7rem;

  svg {
    height: 1rem;
    width: 1rem;
    vertical-align: top;
  }

  a,
  svg {
    color: ${(props) => props.theme.primaryColor};
  }
`;

export function SocialBar({ profiles }: any) {
  if (!profiles) return null;

  return (
    <SocialDiv>
      {profiles
        .filter((profile) => profile.url)
        .map((profile: any) => (
          <a href={profile.url} key={profile.url}>
            {getIcon(profile.network)}
          </a>
        ))}
    </SocialDiv>
  );
}
