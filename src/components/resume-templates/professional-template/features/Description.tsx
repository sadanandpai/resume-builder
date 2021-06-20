import React from "react";
import styled from "styled-components";

const RoundedImage = styled.img`
  border-radius: 50%;
  height: 60px;
  width: 60px;
  float: left;
  shape-outside: circle();
  margin-right: 20px;
  margin-bottom: 5px;
  border: 0.5px solid ${(props) => props.theme.fontColor};
`;

export function Description({ icon, title, description, photo }: any) {
  return (
    <>
      {photo && <RoundedImage src={photo} />}
      {description}
    </>
  );
}
