import { H1 } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  email?: string;
  phone?: string;
  location?: { city?: string };
};

export function Header({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <header style={{ marginBottom: 18 }}>
      <H1 p={p} size={28}>
        {basics.name}
      </H1>
      <div style={{ fontSize: 12, color: p.primary, fontWeight: 600 }}>{basics.label}</div>
      <div style={{ fontSize: 10, color: p.muted, marginTop: 8 }}>
        {[basics.email, basics.phone, basics.location?.city].filter(Boolean).join(' · ')}
      </div>
    </header>
  );
}
