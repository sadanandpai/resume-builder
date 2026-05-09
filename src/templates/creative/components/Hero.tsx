import { H1, Label, ProfileAvatar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import { withAlpha } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  image?: string;
};

export function Hero({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <header style={{ position: 'relative', padding: '36px 36px 22px', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: withAlpha(p.accent, 0.2),
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 30,
          right: 120,
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: withAlpha(p.primary, 0.15),
        }}
      />
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 18 }}>
        <ProfileAvatar
          src={basics.image}
          size={90}
          radius="16px"
          border={`3px solid ${p.accent}`}
        />
        <div>
          <H1 p={p} size={30}>
            {basics.name}
          </H1>
          <Label p={p} color={p.accent}>
            {basics.label}
          </Label>
        </div>
      </div>
    </header>
  );
}
