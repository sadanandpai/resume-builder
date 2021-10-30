import React from 'react';
import styled from 'styled-components';
import Color from 'color';
import { Flex, FlexHVC } from 'src/styles/styles';
import { getIcon } from 'src/styles/icons';

const SectionHolder = styled.div`
  border: 1px solid ${(props) => Color(props.theme.fontColor).alpha(0.25).toString()};
  border-radius: 5px;
  padding: 15px 10px 10px 10px;
  position: relative;

  .header {
    position: absolute;
    top: -10px;
    left: 8px;
    background: ${(props) => props.theme.backgroundColor};
    padding: 0 5px;
    font-weight: bold;
    color: ${(props) => props.theme.primaryColor};

    svg {
      font-size: 0.8rem;
    }
  }
`;

const SectionIntroHolder = styled(SectionHolder)`
  padding-top: 20px;

  .header {
    top: -20px;
    left: 0;
    margin-left: 5px;
    padding: 0 5px;
    background: ${(props) => props.theme.backgroundColor};

    .header__title {
      margin: 0;
      color: ${(props) => props.theme.primaryColor};
    }
  }

  .social-icons {
    position: absolute;
    top: -12px;
    right: 10px;
    font-size: 18px;
    column-gap: 5px;

    svg {
      color: ${(props) => props.theme.primaryColor};
      background-color: ${(props) => props.theme.backgroundColor};
    }
  }
`;

export function ModernHeader({ styles, title, icon, children }: any) {
  return (
    <SectionHolder style={styles}>
      <FlexHVC className="header" cGap="5px">
        {icon}
        <div className="header__title">{title}</div>
      </FlexHVC>
      {children}
    </SectionHolder>
  );
}

export function ModernHeaderIntro({ styles, title, profiles, children }: any) {
  return (
    <SectionIntroHolder style={styles}>
      <FlexHVC className="header">
        <h1 className="header__title">{title}</h1>
      </FlexHVC>
      <Flex className="social-icons">
        {profiles
          .filter((profile) => profile.url)
          .map((profile: any) => (
            <a href={profile.url} key={profile.url}>
              {getIcon(profile.network)}
            </a>
          ))}
      </Flex>
      {children}
    </SectionIntroHolder>
  );
}
