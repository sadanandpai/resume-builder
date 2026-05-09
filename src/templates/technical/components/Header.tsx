import { H1 } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

import { TECHNICAL_MONO } from './technicalMono';

type Basics = {
  name: string;
  label: string;
  email?: string;
  phone?: string;
  url?: string;
  location?: { city?: string };
};

export function Header({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px dashed ${p.divider}`,
        paddingBottom: 14,
      }}
    >
      <div>
        <div style={{ ...TECHNICAL_MONO, color: p.accent, fontSize: 11 }}>&lt;hello /&gt;</div>
        <H1 p={p} size={26}>
          {basics.name}
        </H1>
        <div style={{ ...TECHNICAL_MONO, fontSize: 11, color: p.muted }}>
          {'// '}
          {basics.label}
        </div>
      </div>
      <div style={{ textAlign: 'right', fontSize: 10.5, ...TECHNICAL_MONO }}>
        {basics.email && <div>{basics.email}</div>}
        {basics.phone && <div>{basics.phone}</div>}
        {basics.location?.city && <div>{basics.location.city}</div>}
        {basics.url && <div>{basics.url}</div>}
      </div>
    </header>
  );
}
