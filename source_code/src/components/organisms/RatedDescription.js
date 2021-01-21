import React from "react";

import SectionHeader from "../molecules/SectionHeader";
import RatingElement from "../molecules/RatingElement";

export default function RatedDescription({ title, Icon, description }) {
  return (
    <div>
      <SectionHeader title={title} Icon={Icon} />
      <div className="margin-bottom-10">
        {description.map((data) => (
          <RatingElement itemLabel={data.name} itemRating={data.rating} key={data.name} />
        ))}
      </div>
    </div>
  );
}
