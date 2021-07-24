import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #222;
  padding: 1.25rem;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: 380px;
  background: #222;
`;

export function SideDrawer({ children }: any) {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
}
