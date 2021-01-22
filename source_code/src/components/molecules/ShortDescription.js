import React from "react";

import SectionHeader from "../molecules/SectionHeader";

export default function ShortDescription({ title, Icon, description }) {
  return (
    <div>
      <SectionHeader title={title} Icon={Icon} />
      <div dangerouslySetInnerHTML={{ __html: description }}></div>
    </div>
  );
}
