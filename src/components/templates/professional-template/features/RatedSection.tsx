import React, { useRef, useEffect } from "react";
import { FlexCol } from "../../../common/styles";
import { Section } from "../core/Section";
import { RatedElement } from "../core/RatedElement";

export function UnratedSection({ icon, title, items }: any) {
  return (
    <FlexCol rGap="8px">
      {items.map((data: any, index: number) => (
        <RatedElement
          itemLabel={data.name}
          itemRating={data.rating}
          key={data.name}
          index={index}
        />
      ))}
    </FlexCol>
  );
}
