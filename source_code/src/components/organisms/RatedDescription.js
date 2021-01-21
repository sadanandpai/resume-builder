import React from "react";

import SectionHeader from "../templates/SectionHeader/SectionHeader";
// import SectionHeader from "../molecules/SectionHeader";
import RatingElement from "../molecules/RatingElement";

export default function RatedDescription({ title, icon, description }) {
  return (
    <>
      <SectionHeader title={title} icon={icon} />

      <div className="margin-bottom-10">
        {description.map((data) => (
          <RatingElement itemLabel={data.name} itemRating={data.rating} key={data.name} />
        ))}
      </div>
    </>
  );
}
