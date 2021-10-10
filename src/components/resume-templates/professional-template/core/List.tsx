import React from "react";

export function List({ items }: any) {

  if(!items)
    return null;
    
  return (
    <ul style={{ paddingLeft: "16px", marginBottom: "0", fontSize: "0.8rem" }}>
      {items.map((data: any, index: any) => (
        <li key={index} dangerouslySetInnerHTML={{ __html: data }}></li>
      ))}
    </ul>
  );
}
