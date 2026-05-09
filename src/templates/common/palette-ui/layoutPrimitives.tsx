import React, { CSSProperties } from 'react';

import type { ResumePalette } from '@/templates/common/resumePalette';

export const pageStyle = (p: ResumePalette): CSSProperties => ({
  width: '100%',
  height: '100%',
  background: p.bg,
  color: p.text,
  fontFamily: p.bodyFont,
  fontSize: 11,
  lineHeight: 1.45,
  boxSizing: 'border-box',
});

export const H1 = ({
  children,
  p,
  size = 26,
  color,
}: {
  children: React.ReactNode;
  p: ResumePalette;
  size?: number;
  color?: string;
}) => (
  <h1
    style={{
      margin: 0,
      fontFamily: p.headingFont,
      fontSize: size,
      fontWeight: 700,
      letterSpacing: '0.01em',
      color: color || p.primary,
    }}
  >
    {children}
  </h1>
);

export const Label = ({
  children,
  p,
  color,
}: {
  children: React.ReactNode;
  p: ResumePalette;
  color?: string;
}) => (
  <div
    style={{
      fontSize: 12,
      color: color || p.muted,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      marginTop: 4,
    }}
  >
    {children}
  </div>
);

export const JobHeader = ({
  position,
  company,
  date,
  p,
  compact,
}: {
  position: string;
  company: string;
  date: string;
  p: ResumePalette;
  compact?: boolean;
}) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: compact ? 11 : 12, color: p.text }}>{position}</div>
      <div style={{ fontSize: 11, color: p.primary, fontWeight: 500 }}>{company}</div>
    </div>
    <div style={{ fontSize: 10, color: p.muted, whiteSpace: 'nowrap' }}>{date}</div>
  </div>
);
