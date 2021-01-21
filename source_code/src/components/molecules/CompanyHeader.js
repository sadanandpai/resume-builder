import React from "react";
import styled from "styled-components";

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

const Italic = styled.div`
  font-style: italic;
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
          <Italic>{props.company.years}</Italic>
        </FlexJustifiedBetween>
        <FlexJustifiedBetween>
          <CompanyRole>{props.company.role}</CompanyRole>
          <Italic>{props.company.expYears}</Italic>
        </FlexJustifiedBetween>
      </div>

      <ul>{descriptionTemplate}</ul>
    </Header>
  );
}
