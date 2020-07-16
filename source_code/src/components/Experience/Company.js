import React from "react";
import "./Experience.css";

export default function Company(props) {
  const descriptionTemplate = [];
  props.company.description.forEach((data, index) => {
    descriptionTemplate.push(<li key={index} dangerouslySetInnerHTML={{ __html: data}}></li>);
  });

  return (
    <div className="company">
      <div className="exp-dot"></div>
      {!props.finalIndex && <div className="vertical-exp-bar"></div>}
      <div>
        <div className="flex-container justify-content-between">
          <div className="company-name">{props.company.name}</div>
          <div className="font-italic">{props.company.years}</div>
        </div>
        <div className="flex-container justify-content-between">
          <div className="company-role">{props.company.role}</div>
          <div className="font-italic">{props.company.expYears}</div>
        </div>
      </div>

      <ul>{descriptionTemplate}</ul>
    </div>
  );
}
