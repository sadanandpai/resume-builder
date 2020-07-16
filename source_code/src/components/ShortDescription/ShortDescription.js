import React from "react";

import SectionHeader from '../SectionHeader/SectionHeader'

class ShortDescription extends React.Component {
  render() {
    return (
      <div className="short-description">
        <SectionHeader title={this.props.title} icon={this.props.icon} />
        <div dangerouslySetInnerHTML={{ __html: this.props.description}}></div>
      </div>
    );
  }
}

export default ShortDescription;
