import React, { useRef, useEffect } from "react";
import { FlexCol } from "../common/styles";
import { Section } from "../core/Section";
import { List } from "../core/List";

export function ListSection({ icon, title, items }: any) {  
  return (
    <Section title={title} icon={icon}>
      <List items={items} />
    </Section>
  );
}
