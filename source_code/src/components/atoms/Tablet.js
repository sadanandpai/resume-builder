import styled from "styled-components";

export default styled.span`
  width: 20px;
  height: 12px;
  border-radius: 20%;
  display: inline-block;
  border: 1px solid brown;
  margin: 0px 6px;
  background-color: ${(props) => (props.filled ? "brown" : "transparent")};
`;
