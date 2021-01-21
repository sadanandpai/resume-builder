import React from "react";

import SectionHeader from "../templates/SectionHeader/SectionHeader";

export default function ShortDescription({ title, icon, description }) {
  return (
    <div className="short-description">
      <SectionHeader title={title} icon={icon} />
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
}
