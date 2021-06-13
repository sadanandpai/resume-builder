import React, { useState } from "react";
import styled from "styled-components";
import { Steps } from "antd";
import { getIcon } from "../common/icons";

import { useExp } from "../common/store";
import { Section } from "../core/Section";

import { CompanyHeader } from "../core/Company";
import { List } from "../core/List";

const ExpSteps = styled(Steps)`
  justify-content: space-between;
  height: 100%;

  .ant-steps-item:last-child{
    flex-grow: 0;
  }
`

const Step = styled(ExpSteps.Step)`
  .ant-steps-item-title {
    display: block;
    padding-right: 0;
  }

  .ant-steps-item-container > .ant-steps-item-tail {
    top: 15px !important;
  }

  .ant-steps-item-icon {
    margin-top: 20px !important;
  }

  .ant-steps-item-container
    > .ant-steps-item-content
    > .ant-steps-item-description {
    color: black;
    padding-bottom: 0;
  }
`;

export function Exp({icon, title, companies}: any) {

  return (
    <Section icon={icon} title={title} styles={{ flexGrow: 1 }}>
      <ExpSteps
        progressDot
        current={companies.length}
        direction="vertical"
      >
        {companies.map((company: any, index: any) => {
          const HeaderComponent = <CompanyHeader company={company} />;
          const DescriptionComponent = <List items={company.description} />;
          return (
            <Step
              title={HeaderComponent}
              description={DescriptionComponent}
              key={index}
              style={{paddingBottom: '0px'}}
            />
          );
        })}
      </ExpSteps>
    </Section>
  );
}
