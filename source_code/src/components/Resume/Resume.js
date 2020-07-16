import React from "react";
import "./resume.css";

import Seperator from "../Seperator";

import Introduction from "../Introduction/Introduction";
import ShortDescription from "../ShortDescription/ShortDescription";
import ListDescription from "../ListDescription/ListDescription";
import RatedDescription from "../RatedDescription/RatedDescription";
import NonRatedDescription from "../NonRatedDescription/NonRatedDescription";
import Experience from "../Experience/Experience";
import Education from "../Education/Education";

class Resume extends React.Component {
  render() {
    return (
      <div className="grid-container">
        <div className="flex-container-column justify-content-between">
          <Introduction name={this.props.data.name} role={this.props.data.role} personalDetails={this.props.data.personal_details} />
          <Experience title={this.props.data.companyDetails.title} companyList={this.props.data.companyDetails.companyList} />
          <Seperator />
          <ListDescription title={this.props.data.key_projects.title} description={this.props.data.key_projects.description} />
          <Seperator />
          <ListDescription title={this.props.data.certificates.title} description={this.props.data.certificates.description} />
        </div>

        <div className="divider"></div>

        <div className="flex-container-column justify-content-between margin-10-left">
          <ShortDescription title={this.props.data.summary.title} description={this.props.data.summary.description} icon="summary" />
          <Seperator />
          <ShortDescription title={this.props.data.career.title} description={this.props.data.career.description} icon="career" />
          <Seperator />
          <RatedDescription
            title={this.props.data.skills.title}
            description={this.props.data.skills.description}
            icon="summary"
          />
          <Seperator />
          <NonRatedDescription
            title={this.props.data.expertise.title}
            description={this.props.data.expertise.description}
            icon="summary"
          />
          <Seperator />
          <NonRatedDescription
            title={this.props.data.methodology.title}
            description={this.props.data.methodology.description}
            icon="summary"
          />
          <Seperator />
          <NonRatedDescription
            title={this.props.data.tools.title}
            description={this.props.data.tools.description}
            icon="summary"
          />
          <Seperator />
          <Education title={this.props.data.education.title} description={this.props.data.education.description} icon="summary" />
        </div>
      </div>
    );
  }
}

export default Resume;
