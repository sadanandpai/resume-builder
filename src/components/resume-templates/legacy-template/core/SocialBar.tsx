import React from "react";
import styled from "styled-components";
import { getIcon } from "../../../common/icons";

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
    color: ${(props) => props.theme.fontColor};
  }
`;

export function SocialBar({ items }: any) {

  if(!items)
    return null;

  return (
    <SocialDiv>
      {items.map((icon: any, index: number) => (
        <a href={icon[1]} key={index}>
          {getIcon(icon[0])} <span>{icon[1].split("/").slice(-2)}</span>
        </a>
      ))}
    </SocialDiv>
  );
}
