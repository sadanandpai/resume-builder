import type { ResumePalette } from '@/templates/common/resumePalette';

import { STRAIGHTFORWARD_SERIF } from './straightforwardTheme';

type Basics = {
  name: string;
  label: string;
  email?: string;
  phone?: string;
  location?: { city?: string };
};

export function Header({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <>
      <h1 style={{ fontFamily: STRAIGHTFORWARD_SERIF, fontSize: 28, margin: 0, color: p.primary }}>
        {basics.name}
      </h1>
      <div style={{ fontSize: 12, color: p.muted, marginTop: 4 }}>{basics.label}</div>
      <div style={{ fontSize: 10.5, marginTop: 8, color: p.text }}>
        {[basics.email, basics.phone, basics.location?.city].filter(Boolean).join(' · ')}
      </div>
    </>
  );
}
