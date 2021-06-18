import styled from "styled-components";

export const Separator = styled.div`
  width: 80%;
  margin: 12px auto 8px auto;
  height: 2px;
  background-color: brown;
  position: relative;

  &::before {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    background-color: black;
    top: -1.5px;
    left: -2px;
    content: "";
  }

  &::after {
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    position: absolute;
    background-color: black;
    top: -1.5px;
    right: -2px;
    content: "";
  }
`;
