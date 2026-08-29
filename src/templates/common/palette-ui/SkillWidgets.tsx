import React, { CSSProperties } from 'react';

import type { ResumePalette } from '@/templates/common/resumePalette';
import { withAlpha } from '@/templates/common/resumePalette';

export const SkillBar = ({ name, level, p }: { name: string; level: number; p: ResumePalette }) => {
  const pct = Math.max(0, Math.min(100, level > 5 ? level : (level / 5) * 100));
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10.5,
          marginBottom: 3,
        }}
      >
        <span>{name}</span>
        <span style={{ color: p.muted }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: p.divider, borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: p.accent, borderRadius: 2 }} />
      </div>
    </div>
  );
};

export const SkillDots = ({
  name,
  level,
  p,
  total = 5,
}: {
  name: string;
  level: number;
  p: ResumePalette;
  total?: number;
}) => {
  const norm = level > 5 ? Math.round((level / 100) * total) : level;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 10.5,
        marginBottom: 4,
      }}
    >
      <span>{name}</span>
      <span style={{ display: 'inline-flex', gap: 3 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i < norm ? p.accent : p.divider,
              display: 'inline-block',
            }}
          />
        ))}
      </span>
    </div>
  );
};

export const ChipList = ({
  items,
  p,
  variant = 'outline',
}: {
  items: { name: string }[];
  p: ResumePalette;
  variant?: 'outline' | 'filled' | 'soft';
}) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map((item, idx) => {
        const base: CSSProperties = {
          fontSize: 10,
          padding: '2px 8px',
          borderRadius: 999,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        };
        let style: CSSProperties = { ...base };
        if (variant === 'filled') style = { ...base, background: p.primary, color: '#fff' };
        else if (variant === 'soft')
          style = { ...base, background: withAlpha(p.accent, 0.18), color: p.primaryDark };
        else style = { ...base, border: `1px solid ${p.divider}`, color: p.text };
        return (
          <span key={idx} style={style}>
            {item.name}
          </span>
        );
      })}
    </div>
  );
};
