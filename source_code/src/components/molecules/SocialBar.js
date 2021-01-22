import React from "react";
import styled from "styled-components";
import { IconHolder } from "../atoms/Styles";

import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

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
      <div className="linkedin">
        <IconHolder styles={{ "vertical-align": "middle" }}>
          <FaLinkedin />
        </IconHolder>
        <span>
          <a target="_blank" rel="noopener noreferrer" href={"http://linkedin.com/in/" + linkedin}>
            {linkedin}
          </a>
        </span>
      </div>
      <div className="github">
        <IconHolder styles={{ "vertical-align": "middle" }}>
          <FaGithub />
        </IconHolder>
        <span>
          <a target="_blank" rel="noopener noreferrer" href={"http://github.com/" + github}>
            {github}
          </a>
        </span>
      </div>
    </SocialDiv>
  );
}
