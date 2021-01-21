import React from "react";
import SectionHeader from "../templates/SectionHeader/SectionHeader";

import Badge from "../atoms/Badge";

export default function NonRatedDescription({ title, icon, description }) {
  return (
    <>
      <SectionHeader title={title} icon={icon} />
      <div className="margin-bottom-10">
        {description.map((data, index) => (
          <Badge key={index}>{data}</Badge>
        ))}
      </div>
    </>
  );
}
