import React from "react";
import styled from "styled-components";
import { IconHolder } from "../atoms/Styles";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

const SocialDiv = styled.div`
  padding: 10px;
  border-top: 2px solid #007bff;
  border-bottom: 2px solid #007bff;
  margin: 12px 0px;
  display: flex;
  justify-content: space-around;
`;

export default function SocialBar({ linkedin, github }) {
  return (
    <SocialDiv>
      <span className="linkedin">
        <IconHolder>
          <LinkedInIcon />
        </IconHolder>
        <span>
          <a target="_blank" rel="noopener noreferrer" href={"http://linkedin.com/in/" + linkedin}>
            {linkedin}
          </a>
        </span>
      </span>
      <span className="github">
        <IconHolder>
          <GitHubIcon />
        </IconHolder>
        <span>
          <a target="_blank" rel="noopener noreferrer" href={"http://github.com/" + github}>
            {github}
          </a>
        </span>
      </span>
    </SocialDiv>
  );
}
