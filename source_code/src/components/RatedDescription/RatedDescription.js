import React from "react";
import "./rated-description.css";
import SectionHeader from '../SectionHeader/SectionHeader'

class RatedDescription extends React.Component {
  render() {
    const template = [];
    this.props.description.forEach((data, index) => {
      template.push(
        <div className="rated-data" key={index}>
          <div className="rated-type">{data.name}</div>
          <div className="rated-rating">{fetchRating(data.rating)}</div>
        </div>
      );
    });

    function fetchRating(rating) {
      const ratingTemplate = [];
      for (let i = 0; i < 5; i++) {
        if (i < rating) ratingTemplate.push(<div className="rating-tablet filled" key={i}></div>);
        else ratingTemplate.push(<div className="rating-tablet" key={i}></div>);
      }
      return ratingTemplate;
    }

    return (
      <div>
        <SectionHeader title={this.props.title} icon={this.props.icon} />
        <div className="margin-bottom-10">{template}</div>
      </div>
    );
  }
}

export default RatedDescription;