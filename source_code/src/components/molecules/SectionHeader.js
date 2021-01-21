import React from "react";
import { TitleHeader } from "../atoms/Styles";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import { IconHolder } from "../atoms/Styles";

export default function SectionHeader({ title, icon }) {
  return (
    <TitleHeader>
      <IconHolder>
        <VerifiedUserIcon />
      </IconHolder>
      <span>{title}</span>
    </TitleHeader>
  );
}
