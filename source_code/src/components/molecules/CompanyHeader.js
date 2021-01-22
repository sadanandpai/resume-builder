import React from "react";
import styled from "styled-components";

import { ItalicDiv } from "../atoms/Styles";

const Header = styled.div`
  position: relative;
  margin-top: 20px;
`;

const CompanyName = styled.div`
  font-size: 22px;
  font-weight: 400;
`;

const CompanyRole = styled.div`
  font-weight: 600;
`;

const FlexJustifiedBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default function CompanyHeader(props) {
  const descriptionTemplate = [];
  props.company.description.forEach((data, index) => {
    descriptionTemplate.push(<li key={index} dangerouslySetInnerHTML={{ __html: data }}></li>);
  });

  return (
    <Header>
      <div className="exp-dot"></div>
      {!props.finalIndex && <div className="vertical-exp-bar"></div>}
      <div>
        <FlexJustifiedBetween>
          <CompanyName>{props.company.name}</CompanyName>
          <ItalicDiv>{props.company.years}</ItalicDiv>
        </FlexJustifiedBetween>
        <FlexJustifiedBetween>
          <CompanyRole>{props.company.role}</CompanyRole>
          <ItalicDiv>{props.company.expYears}</ItalicDiv>
        </FlexJustifiedBetween>
      </div>

      <ul>{descriptionTemplate}</ul>
    </Header>
  );
}
