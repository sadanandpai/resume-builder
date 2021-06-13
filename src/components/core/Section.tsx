import React, { useState } from "react";
import styled from "styled-components";
import { Flex, FlexHVC } from "../common/styles";
import { getIcon } from "../common/icons";

const SectionHolder = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 15px 10px 10px 10px;
  position: relative;

  .header {
    position: absolute;
    top: -10px;
    left: 8px;
    background: white;
    padding: 0 5px;
    font-weight: bold;
    color: rgb(0, 123, 255);

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
    background: white;
    margin-left: 5px;
    padding: 0 5px;

    .header__title {
      margin: 0;
      color: rgb(0, 123, 255);
    }

  }

  .social-icons {
    position: absolute;
    top: -12px;
    right: 10px;
    font-size: 18px;
    column-gap: 5px;

    svg {
      background-color: white;
    }
  }
`;

export function Section(props: any) {
  return (
    <SectionHolder style={props.styles}>
      <FlexHVC className="header" cGap="5px">
        {props.icon}
        <div className="header__title">{props.title}</div>
      </FlexHVC>
      {props.children}
    </SectionHolder>
  );
}

export function SectionIntro(props: any) {
  return (
    <SectionIntroHolder style={props.styles}>
      <FlexHVC className="header">
        <h1 className="header__title">{props.title}</h1>
      </FlexHVC>
      <Flex className="social-icons">
        {props.icons.map((icon: any) => (
          <a href={icon[1]}>{getIcon(icon[0])}</a>
        ))}
      </Flex>
      {props.children}
    </SectionIntroHolder>
  );
}
