import React from 'react';
import styled from 'styled-components';
import DOMPurify from 'dompurify';

const UL = styled.ul`
  padding-left: 16px;
  margin-bottom: 0;
  font-size: 0.8rem;
`;

export function List({ items }: any) {
  return (
    <UL>
      {React.Children.map(items, (item) => (
        <li dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }} />
      ))}
    </UL>
  );
}
