import React, { useState } from "react";
import styled from "styled-components";

import { Flex } from "../../../common/styles";

const CompanyName = styled.div`
  font-size: 1rem;
  font-weight: 500;
`;

const CompanyRole = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  line-height: inherit;
`;

const CompanyExp = styled.div`
  font-style: italic;
  font-size: 0.6rem;
`;

export function CompanyHeader(props: any) {
  return (
    <>
      <Flex jc="space-between" ai="flex-end" style={{ lineHeight: "initial" }}>
        <CompanyName>{props.company.name}</CompanyName>
        <CompanyExp>{props.company.years}</CompanyExp>
      </Flex>
      <Flex jc="space-between" ai="flex-end">
        <CompanyRole>{props.company.role}</CompanyRole>
        <CompanyExp>{props.company.expYears}</CompanyExp>
      </Flex>
    </>
  );
}
