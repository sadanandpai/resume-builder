import React from "react";
import SectionHeader from "../SectionHeader/SectionHeader";

class ListDescription extends React.Component {
  render() {
    const template = [];
    this.props.description.forEach((data, index) => {
      template.push(<li key={index} dangerouslySetInnerHTML={{ __html: data}}></li>);
    });

    return (
      <div className="list-items">
        <SectionHeader title={this.props.title} icon={this.props.icon} />
        <ul className="ul-padding-20">{template}</ul>
      </div>
    );
  }
}

export default ListDescription;