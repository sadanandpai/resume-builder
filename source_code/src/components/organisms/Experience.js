import React from "react";
import styled from "styled-components";

import Company from "../molecules/CompanyHeader";
import SectionHeader from "../templates/SectionHeader/SectionHeader";

const Section = styled.div`
  margin: 15px 10px 10px 20px;
`;

export default function Experience({ title, icon, companyList }) {
  return (
    <Section>
      <SectionHeader title={title} icon={icon} />
      <div className="row">
        <div className="col-11 offset-1 col-11-custom">
          {companyList.map((company, index) => (
            <Company company={company} finalIndex={index === companyList.length - 1} key={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}
