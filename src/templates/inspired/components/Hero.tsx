import { ContactBlock, H1, ProfileAvatar } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import { withAlpha } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  location?: { city?: string };
};

export function Hero({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 220,
          height: 200,
          background: withAlpha(p.primary, 0.18),
          borderBottomRightRadius: '100%',
        }}
      />
      <header
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '28px 32px 16px',
        }}
      >
        <ProfileAvatar src={basics.image} size={84} border={`4px solid ${p.primary}`} />
        <div
          style={{
            flex: 1,
            background: p.primary,
            color: '#fff',
            padding: '16px 20px',
            borderRadius: 8,
          }}
        >
          <H1 p={p} size={24} color="#fff">
            {basics.name}
          </H1>
          <div style={{ fontSize: 11, opacity: 0.95, marginTop: 4 }}>{basics.label}</div>
          <div style={{ marginTop: 10, fontSize: 10 }}>
            <ContactBlock
              email={basics.email}
              phone={basics.phone}
              city={basics.location?.city}
              url={basics.url}
              inline
              color="#fff"
            />
          </div>
        </div>
      </header>
    </>
  );
}
