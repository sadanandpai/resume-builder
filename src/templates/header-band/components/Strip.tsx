import { ContactBlock, H1, ProfileAvatar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  location?: { city?: string };
};

export function Strip({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <header
      style={{
        background: p.primary,
        color: '#fff',
        padding: '28px 36px',
        display: 'flex',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <ProfileAvatar src={basics.image} size={84} border={`3px solid ${p.accent}`} />
      <div style={{ flex: 1 }}>
        <H1 p={p} size={28} color="#fff">
          {basics.name}
        </H1>
        <div
          style={{
            fontSize: 12,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.9,
            marginTop: 4,
          }}
        >
          {basics.label}
        </div>
      </div>
      <div style={{ textAlign: 'right' }}>
        <ContactBlock
          email={basics.email}
          phone={basics.phone}
          city={basics.location?.city}
          url={basics.url}
          color="#fff"
        />
      </div>
    </header>
  );
}
