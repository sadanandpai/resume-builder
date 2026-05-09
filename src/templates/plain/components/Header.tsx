import type { ResumePalette } from '@/templates/common/resumePalette';

const serif = "'Georgia', serif";

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
    <div
      style={{
        textAlign: 'center',
        borderBottom: `1px solid ${p.divider}`,
        paddingBottom: 16,
        marginBottom: 20,
      }}
    >
      <h1 style={{ fontFamily: serif, fontSize: 32, margin: 0, color: p.text }}>{basics.name}</h1>
      <div
        style={{
          fontSize: 12,
          marginTop: 6,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {basics.label}
      </div>
      <div style={{ fontSize: 10.5, color: p.muted, marginTop: 10 }}>
        {[basics.email, basics.phone, basics.location?.city, basics.url]
          .filter(Boolean)
          .join(' · ')}
      </div>
    </div>
  );
}
