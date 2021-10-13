import React from "react";

export function List({ items }: any) {
  return (
    <ul style={{ paddingLeft: "16px", marginBottom: "0", fontSize: "0.8rem" }}>
      {items.map((data: any) => (
        <li key={data} dangerouslySetInnerHTML={{ __html: data }} />
      ))}
    </ul>
  );
}
