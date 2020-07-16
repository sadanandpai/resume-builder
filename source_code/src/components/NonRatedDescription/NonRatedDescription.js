import React from "react";
import "./non-rated-description.css";
import SectionHeader from '../SectionHeader/SectionHeader'

class NonRatedDescription extends React.Component {
  render() {
    const template = [];
    this.props.description.forEach((data, index) => {
    template.push(
      <span className="badge" key={index}>
        {data}
      </span>
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

export default NonRatedDescription;