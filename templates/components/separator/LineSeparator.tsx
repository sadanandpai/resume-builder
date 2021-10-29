import styled from 'styled-components';

export const LineSeparator = styled.div`
  width: 80%;
  margin: 10px auto 4px auto;
  min-height: 1px;
  background-color: ${(props) => props.theme.secondaryColor};
`;
