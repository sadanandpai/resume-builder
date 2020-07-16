import React from "react";
import "./Experience.css";

import Company from "./Company";
import SectionHeader from "../SectionHeader/SectionHeader";

class Experience extends React.Component {
  render() {
    const companyTemplate = [];
    this.props.companyList.forEach((company, index) => {
      companyTemplate.push(<Company company={company} finalIndex={index === this.props.companyList.length - 1} key={index}></Company>);
    });

    return (
      <div className="experience-company">
        <SectionHeader title={this.props.title} icon={this.props.icon} />

        <div className="row">
          <div className="col-11 offset-1 col-11-custom">{companyTemplate}</div>
        </div>
      </div>
    );
  }
}

export default Experience;
