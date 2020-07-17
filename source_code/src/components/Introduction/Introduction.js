import React from "react";
import "./introduction.css";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import CallIcon from "@material-ui/icons/Call";
import MailIcon from "@material-ui/icons/Mail";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

class Introduction extends React.Component {
  render() {
    return (
      <div className="intro-container" onDoubleClick={() => {
        window.document.designMode = window.document.designMode === "off" ? "on" : "off";
      }}>
        <h1 className="name">{this.props.personalDetails.name}</h1>
        <div className="main-intro flex-container justify-content-between">
          <div className="experience flex-container-column justify-content-start">
            <div className="role">{this.props.personalDetails.role}</div>
            <div>
              {this.props.personalDetails.experience[0].type} : <strong>{this.props.personalDetails.experience[0].years}</strong>
            </div>
            <div>
              {this.props.personalDetails.experience[1].type} : <strong>{this.props.personalDetails.experience[1].years}</strong>
            </div>
          </div>
          <div className="personal-details flex-container-column justify-content-end">
            <div className="mobile">
              <CallIcon />
              <span>{this.props.personalDetails.mobile}</span>
            </div>
            <div className="email">
              <MailIcon />
              <span>{this.props.personalDetails.email}</span>
            </div>
            <div className="location">
              <LocationOnIcon />
              <span>{this.props.personalDetails.location}</span>
            </div>
          </div>
        </div>

        <div className="social flex-container justify-content-around">
          <span className="linkedin">
            <LinkedInIcon />
            <span className="v-align-middle"><a target="_blank" rel="noopener noreferrer" href={'http://linkedin.com/in/' + this.props.personalDetails.linkedin}>{this.props.personalDetails.linkedin}</a></span>
          </span>
          <span className="github">
            <GitHubIcon />
            <span className="v-align-middle"><a target="_blank" rel="noopener noreferrer" href={'http://github.com/' + this.props.personalDetails.github}>{this.props.personalDetails.github}</a></span>
          </span>
        </div>
      </div>
    );
  }
}

export default Introduction;
