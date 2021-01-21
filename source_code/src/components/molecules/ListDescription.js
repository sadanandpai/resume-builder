import React from "react";
import SectionHeader from "../templates/SectionHeader/SectionHeader";

export default function ListDescription({ title, icon, description }) {
  return (
    <div className="list-items">
      <SectionHeader title={title} icon={icon} />
      <ul className="ul-padding-20">
        {description.map((data, index) => (
          <li key={index} dangerouslySetInnerHTML={{ __html: data }}></li>
        ))}
      </ul>
    </div>
  );
}
