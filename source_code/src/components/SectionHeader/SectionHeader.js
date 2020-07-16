import React from "react";
import "./section-header.css";

import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import WorkIcon from "@material-ui/icons/Work";
import BuildIcon from "@material-ui/icons/Build";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

class SectionHeader extends React.Component {
  fetchIcon() {
    if (this.props.title.toLowerCase().includes("experience")) {
      return <WorkIcon />;
    } else if (this.props.title.toLowerCase().includes("career")) {
      return <img src="https://cdn2.iconfinder.com/data/icons/carnival-4/48/75-512.png" alt="career objective" />;
    } else if (this.props.title === "Tools") {
      return <BuildIcon />;
    }
    if (this.props.title.toLowerCase().includes("education")) {
      return (
        <img
          src="https://cdn4.iconfinder.com/data/icons/essential-app-1/16/education-degree-course-university-college-512.png"
          alt="Education"
        />
      );
    } else {
    }
    if (this.props.title.toLowerCase().includes("skills")) {
      return <img src="https://static.thenounproject.com/png/225624-200.png" alt="skills" />;
    }
    if (this.props.title === "Areas of Expertise") {
      return (
        <img
          src="https://cdn0.iconfinder.com/data/icons/business-icons-19/128/idea_head-512.png"
          alt="career objective"
        />
      );
    }
    if (this.props.title.toLowerCase().includes("method")) {
      return <img src="https://static.thenounproject.com/png/829223-200.png" alt="Methodology" />;
    }
    if (this.props.title.toLowerCase().includes("key")) {
      return <VpnKeyIcon />;
    }
    if (this.props.title.toLowerCase().includes("certificate")) {
      return <VerifiedUserIcon />;
    } else {
      return <PermIdentityIcon />;
    }
  }

  render() {
    return (
      <div className="title-heading">
        {this.fetchIcon()}
        {this.props.title}
      </div>
    );
  }
}

export default SectionHeader;
