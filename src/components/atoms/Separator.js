import styled from "styled-components";

export default styled.div`
  width: 80%;
  margin: 18px auto 18px auto;
  height: 3px;
  background-color: brown;
  position: relative;

  &::before {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background-color: black;
    top: -3.5px;
    left: -2px;
    content: "";
  }

  &::after {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    background-color: black;
    top: -3.5px;
    right: -2px;
    content: "";
  }
`;
