import React from "react";
import "./education.css";

import SectionHeader from "../SectionHeader/SectionHeader";

class Education extends React.Component {
  render() {
    const template = [];
    this.props.description.forEach((data, index) => {
      template.push(
        <div key={index} className="education">
          <div className="flex-container justify-content-between">
            <div className="degree">{data.degree}</div>
            <div className="font-italic">{data.years}</div>
          </div>
          
          <div className="specialization">{data.specialization}</div>
          <div className="institution">{data.institution}</div>
          <div className="grade">{data.grade}</div>
        </div>
      );
    });

    return (
      <div>
        <SectionHeader title={this.props.title} icon={this.props.icon} />
        <div className="margin-bottom-10">{template}</div>
      </div>
    );
  }
}

export default Education;
