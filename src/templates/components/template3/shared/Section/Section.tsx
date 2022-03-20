import React from 'react';
import { getIcon } from 'src/styles/icons';
import styled from '@emotion/styled';
import { FlexVC } from 'src/styles/styles';

const SectionContainer = styled.section`
  padding: 10px;
`;

const Icon = styled.div`
  margin-right: 4px;
  display: flex;
  align-items: center;

  svg {
    fill: ${(props: any) => props.theme.colors.primaryColor};
  }
`;

const Text = styled.h3`
  margin: 0;
  color: ${(props: any) => props.theme.colors.primaryColor};
  font-weight: 700;
  font-size: 10px;
  margin-right: 10px;
`;

const Content = styled.div`
  padding: 8px 0;
`;

const HR = styled.hr`
  flex: 1;
  opacity: 0.1;
  margin-top: 8px;
  border: 0.1px solid rgba(0, 0, 0, 0.6);
`;

export default function Section({ title = '', icon = '', children }: any) {
  if (!title) return null;

  return (
    <SectionContainer>
      {(title || icon) && (
        <FlexVC>
          {icon && <Icon>{getIcon(icon)}</Icon>}
          {title && <Text>{title}</Text>}
          <HR />
        </FlexVC>
      )}
      {children && <Content>{children}</Content>}
    </SectionContainer>
  );
}
