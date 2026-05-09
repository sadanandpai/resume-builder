import { H1, ProfileAvatar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  image?: string;
  email?: string;
  phone?: string;
  location?: { city?: string };
};

export function Header({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <ProfileAvatar src={basics.image} size={64} />
        <div>
          <H1 p={p} size={26}>
            {basics.name}
          </H1>
          <div style={{ color: p.primary, fontWeight: 600, fontSize: 12 }}>{basics.label}</div>
        </div>
      </div>
      <div style={{ fontSize: 10, color: p.muted, textAlign: 'right' }}>
        {basics.email && <div>{basics.email}</div>}
        {basics.phone && <div>{basics.phone}</div>}
        {basics.location?.city && <div>{basics.location.city}</div>}
      </div>
    </header>
  );
}
