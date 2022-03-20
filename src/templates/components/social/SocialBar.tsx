import React from 'react';
import styled from '@emotion/styled';
import { getIcon } from 'src/styles/icons';

const SocialDiv = styled.div`
  padding: 10px;
  color: ${(props: any) => props.theme.colors.fontColor};
  border-top: 2px solid ${(props: any) => props.theme.colors.primaryColor};
  border-bottom: 2px solid ${(props: any) => props.theme.colors.primaryColor};
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
    color: ${(props: any) => props.theme.colors.primaryColor};
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
