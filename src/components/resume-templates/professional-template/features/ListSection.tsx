import React, { useRef, useEffect } from "react";
import { FlexCol } from "../../../common/styles";
import { Section } from "../core/Section";
import { List } from "../core/List";

export function ListSection({ items }: any) {  
  return (
      <List items={items} />
  );
}
