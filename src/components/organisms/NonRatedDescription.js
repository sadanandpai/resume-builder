import React from "react";
import SectionHeader from "../molecules/SectionHeader";

import Badge from "../atoms/Badge";

export default function NonRatedDescription({ title, Icon, description }) {
  return (
    <div>
      <SectionHeader title={title} Icon={Icon} />
      <div className="margin-bottom-10">
        {description.map((data, index) => (
          <Badge key={index}>{data}</Badge>
        ))}
      </div>
    </div>
  );
}
