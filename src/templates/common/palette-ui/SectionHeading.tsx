import { CSSProperties } from 'react';

import type { ResumePalette } from '@/templates/common/resumePalette';

export const SectionHeading = ({
  title,
  p,
  variant = 'bar',
  align = 'left',
}: {
  title: string;
  p: ResumePalette;
  variant?: 'bar' | 'underline' | 'pill' | 'line' | 'caps';
  align?: 'left' | 'center';
}) => {
  const baseStyle: CSSProperties = {
    color: p.primary,
    fontFamily: p.headingFont,
    fontWeight: 700,
    letterSpacing: variant === 'caps' ? '0.14em' : '0.04em',
    textTransform: variant === 'caps' ? 'uppercase' : 'none',
    fontSize: variant === 'caps' ? 11 : 13,
    margin: '0 0 8px 0',
    textAlign: align,
  };

  if (variant === 'bar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
        <span style={{ width: 14, height: 3, background: p.accent, borderRadius: 2 }} />
        <h3
          style={{
            ...baseStyle,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 11,
          }}
        >
          {title}
        </h3>
      </div>
    );
  }
  if (variant === 'underline') {
    return (
      <h3
        style={{
          ...baseStyle,
          borderBottom: `2px solid ${p.accent}`,
          paddingBottom: 3,
          textTransform: 'uppercase',
          fontSize: 11,
        }}
      >
        {title}
      </h3>
    );
  }
  if (variant === 'pill') {
    return (
      <h3
        style={{
          ...baseStyle,
          display: 'inline-block',
          background: p.primary,
          color: '#fff',
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
        }}
      >
        {title}
      </h3>
    );
  }
  if (variant === 'line') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
        <h3
          style={{
            ...baseStyle,
            margin: 0,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: 11,
          }}
        >
          {title}
        </h3>
        <span style={{ flex: 1, height: 1, background: p.divider }} />
      </div>
    );
  }
  return <h3 style={baseStyle}>{title}</h3>;
};
