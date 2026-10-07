import styled from '@emotion/styled';
import { bodySize, font, roleSize, spacing } from '@/helpers/resume-style/styles';
import { useSurfacePalette } from '../theme';
import type { ReactNode } from 'react';

const Section = styled.section`
  overflow-wrap: anywhere;
  & li {
    margin-bottom: 5px;
  }
  & li::marker {
    color: var(--spotlight-accent);
  }
  & article:last-child {
    margin-bottom: 0 !important;
  }
`;

export function SpotlightSection({ title, children }: { title: string; children: ReactNode }) {
  const p = useSurfacePalette();
  return (
    <Section
      style={
        {
          '--spotlight-accent': p.accent,
          marginBottom: spacing('section', 32),
          color: p.text,
          fontSize: bodySize(11),
          fontFamily: font(p.bodyFont),
        } as import('react').CSSProperties
      }
    >
      <h2
        style={{
          margin: '0 0 12px',
          color: p.accent,
          fontSize: roleSize('heading', 16),
          fontFamily: font(p.headingFont),
          fontWeight: 700,
          borderBottom: `2px solid ${p.accent}`,
          paddingBottom: 3,
          display: 'table',
          textTransform: 'uppercase',
        }}
      >
        {title}
      </h2>
      {children}
    </Section>
  );
}
