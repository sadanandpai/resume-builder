import React from "react";
import styled from "styled-components";

import SocialBar from "../molecules/SocialBar";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";

import LabelValue from "../molecules/LabelValue";
import IconValue from "../molecules/IconValue";

const EmployeeName = styled.h1`
  color: #007bff;
  margin: 0;
  font-weight: 500;
`;

const Intro = styled.div`
  display: flex;
  justify-content: space-between;
`;

const InfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Role = styled.div`
  color: #17a2b8;
  font-size: 18px;
  font-weight: bold;
  margin-top: 7px !important;
  height: 33px !important;
`;

const ContactDiv = styled.div`
  text-align: right;
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export default function Introduction({ personalDetails }) {
  return (
    <>
      <EmployeeName>{personalDetails.name}</EmployeeName>
      <Intro>
        <InfoDiv>
          <Role>{personalDetails.role}</Role>
          <LabelValue label={personalDetails.experience[0].type} value={personalDetails.experience[0].years} />
          <LabelValue label={personalDetails.experience[1].type} value={personalDetails.experience[1].years} />
        </InfoDiv>

        <ContactDiv>
          <IconValue Icon={CallIcon} value={personalDetails.mobile} />
          <IconValue Icon={MailIcon} value={personalDetails.email} />
          <IconValue Icon={LocationOnIcon} value={personalDetails.location} />
        </ContactDiv>
      </Intro>

      <SocialBar linkedin={personalDetails.linkedin} github={personalDetails.github} />
    </>
  );
}
