import React from "react";
import "./section-header.css";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/Build";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

export default function SectionHeader({ title }) {
  function fetchIcon() {
    if (title.toLowerCase().includes("experience")) {
      return <WorkIcon />;
    } else if (title.toLowerCase().includes("career")) {
      return (
        <img
          src="https://cdn2.iconfinder.com/data/icons/carnival-4/48/75-512.png"
          alt="career objective"
        />
      );
    } else if (title === "Tools") {
      return <BuildIcon />;
    }
    if (title.toLowerCase().includes("education")) {
      return (
        <img
          src="https://cdn4.iconfinder.com/data/icons/essential-app-1/16/education-degree-course-university-college-512.png"
          alt="Education"
        />
      );
    } else {
    }
    if (title.toLowerCase().includes("skills")) {
      return <img src="https://static.thenounproject.com/png/225624-200.png" alt="skills" />;
    }
    if (title === "Areas of Expertise") {
      return (
        <img
          src="https://cdn0.iconfinder.com/data/icons/business-icons-19/128/idea_head-512.png"
          alt="career objective"
        />
      );
    }
    if (title.toLowerCase().includes("method")) {
      return <img src="https://static.thenounproject.com/png/829223-200.png" alt="Methodology" />;
    }
    if (title.toLowerCase().includes("key")) {
      return <VpnKeyIcon />;
    }
    if (title.toLowerCase().includes("certificate")) {
      return <VerifiedUserIcon />;
    } else {
      return <PermIdentityIcon />;
    }
  }

  return (
    <div className="title-heading">
      {fetchIcon()}
      {title}
    </div>
  );
}
