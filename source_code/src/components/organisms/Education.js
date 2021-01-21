import React from "react";
import styled from "styled-components";

import SectionHeader from "../templates/SectionHeader/SectionHeader";

export const EducationDiv = styled.div`
  margin-bottom: 10px;

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

export default function Education({ title, icon, description }) {
  return (
    <>
      <SectionHeader title={title} icon={icon} />
      <div className="margin-bottom-10">
        {description.map((data, index) => (
          <EducationDiv key={index}>
            <div className="edu-details">
              <div className="degree">{data.degree}</div>
              <div className="font-italic">{data.years}</div>
            </div>

            <div className="specialization">{data.specialization}</div>
            <div className="institution">{data.institution}</div>
            <div className="grade">{data.grade}</div>
          </EducationDiv>
        ))}
      </div>
    </>
  );
}
