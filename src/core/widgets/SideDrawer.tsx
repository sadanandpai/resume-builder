import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background: #222;
  padding: 0.25rem;
  height: 100%;
`;

const Wrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  width: 380px;
  background: #222;

  &.hide {
    display: none;
  }
`;

export function SideDrawer({ isShown, children }: any) {
  return (
    <Wrapper className={isShown ? '' : 'hide'}>
      <Container>{children}</Container>
    </Wrapper>
  );
}
