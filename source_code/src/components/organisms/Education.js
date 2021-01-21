import React from "react";
import styled from "styled-components";
import { ItalicDiv } from "../atoms/Styles";

import SectionHeader from "../molecules/SectionHeader";

export const EducationDiv = styled.div`
  div {
    margin: 5px 0px;
  }

  .edu-details {
    display: flex;
    justify-content: space-between;
  }

  .degree {
    font-weight: 600;
    font-size: 18px;
  }

  .specialization {
    font-weight: 600;
    font-size: 16px;
  }
`;

export default function Education({ title, Icon, description }) {
  return (
    <div>
      <SectionHeader title={title} Icon={Icon} />

      {description.map((data, index) => (
        <EducationDiv key={index}>
          <div className="edu-details">
            <div className="degree">{data.degree}</div>
            <ItalicDiv>{data.years}</ItalicDiv>
          </div>

          <div className="specialization">{data.specialization}</div>
          <div className="institution">{data.institution}</div>
          <div className="grade">{data.grade}</div>
        </EducationDiv>
      ))}
    </div>
  );
}
