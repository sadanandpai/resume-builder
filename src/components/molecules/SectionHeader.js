import React from "react";
import { TitleHeader } from "../atoms/Styles";
import { IconHolder } from "../atoms/Styles";
import styled from "styled-components";

import { MdEdit } from "react-icons/md";

const MdEditCustom = styled(MdEdit)`
  color: black;
  position: absolute;
  right: 0;
  cursor: pointer;

  @media print {
    display: none;
  }
`;

export default function SectionHeader({ title, Icon }) {
  return (
    <TitleHeader>
      <IconHolder>
        <Icon />
      </IconHolder>
      <span>{title}</span>
      <MdEditCustom />
    </TitleHeader>
  );
}
