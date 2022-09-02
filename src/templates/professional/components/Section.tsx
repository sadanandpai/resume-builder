import React from 'react';
import styled from '@emotion/styled';
import Color from 'color';

const SectionHolder = styled.div`
  border: 1px solid ${(props) => Color(props.theme.highlighterColor).alpha(0.75).toString()};
  border-radius: 5px;
  padding: 15px 10px 10px 10px;
  position: relative;

  .header {
    position: absolute;
    top: -10px;
    left: 8px;
    background: white;
    padding: 0 5px;
    font-weight: bold;
    color: ${(props) => props.theme.titleColor};
  }
`;

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <SectionHolder>
      <div className="header flex justify-center items-center gap-1">
        <span>{title}</span>
      </div>
      {children}
    </SectionHolder>
  );
}
