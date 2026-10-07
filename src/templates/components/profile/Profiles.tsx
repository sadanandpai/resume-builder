import { InlineContacts, ContactList } from '../contact';
import { H1, Label } from '../primitives/layoutPrimitives';
import { ProfileAvatar } from '../primitives/ProfileAvatar';
import { ResumeSurface, useSurfacePalette, MONO_FONT, EDITORIAL_FONT } from '../theme';
import type { ProfileBasics } from '../types';

type Props = { basics: ProfileBasics };
function Identity({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <div style={{ minWidth: 0, overflowWrap: 'anywhere' }}>
      <H1 p={p}>{basics.name}</H1>
      <Label p={p}>{basics.label}</Label>
    </div>
  );
}
export function InlineProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header style={{ marginBottom: 18, minWidth: 0 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <Identity basics={basics} />
        <ProfileAvatar src={basics.image} size={90} />
      </div>
      <div style={{ width: 48, height: 2, background: p.accent, margin: '12px 0' }} />
      <InlineContacts basics={basics} />
    </header>
  );
}
export function CenteredProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        textAlign: 'center',
        borderBottom: `2px solid ${p.primary}`,
        paddingBottom: 14,
        marginBottom: 18,
      }}
    >
      <Identity basics={basics} />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
        <InlineContacts basics={basics} />
      </div>
    </header>
  );
}
export function SidebarProfile({ basics }: Props) {
  return (
    <header
      style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18, minWidth: 0 }}
    >
      <ProfileAvatar src={basics.image} size={90} />
      <ContactList basics={basics} />
    </header>
  );
}
function BandContents({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        background: p.bg,
        color: p.text,
        padding: '28px 36px',
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      <ProfileAvatar src={basics.image} size={84} border={`3px solid ${p.accent}`} />
      <div style={{ flex: '1 1 180px', minWidth: 0 }}>
        <Identity basics={basics} />
      </div>
      <ContactList basics={basics} />
    </header>
  );
}
export const BandProfile = (props: Props) => (
  <ResumeSurface surface="sidebar">
    <BandContents {...props} />
  </ResumeSurface>
);
export function DecorativeProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header style={{ position: 'relative', padding: '36px 36px 22px', overflow: 'hidden' }}>
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: -80,
          right: -80,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: p.divider,
        }}
      />
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 18,
        }}
      >
        <ProfileAvatar
          src={basics.image}
          size={90}
          radius="16px"
          border={`3px solid ${p.accent}`}
        />
        <Identity basics={basics} />
      </div>
    </header>
  );
}
function CardIdentity({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <div
      style={{
        flex: '1 1 180px',
        minWidth: 0,
        background: p.bg,
        color: p.text,
        padding: '16px 20px',
        borderRadius: 8,
      }}
    >
      <Identity basics={basics} />
      <div style={{ marginTop: 10 }}>
        <InlineContacts basics={basics} />
      </div>
    </div>
  );
}
export function CardProfile(props: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 18,
        padding: '28px 32px 16px',
        position: 'relative',
      }}
    >
      <ProfileAvatar src={props.basics.image} size={84} border={`4px solid ${p.primary}`} />
      <ResumeSurface surface="sidebar">
        <CardIdentity {...props} />
      </ResumeSurface>
    </header>
  );
}
export function TechnicalProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        borderBottom: `1px dashed ${p.divider}`,
        paddingBottom: 14,
        minWidth: 0,
      }}
    >
      <div style={{ minWidth: 0 }}>
        <div style={{ fontFamily: MONO_FONT, color: p.accent }}>&lt;hello /&gt;</div>
        <Identity basics={basics} />
      </div>
      <div style={{ fontFamily: MONO_FONT, minWidth: 0 }}>
        <ContactList basics={basics} />
      </div>
    </header>
  );
}
export function EditorialProfile({ basics }: Props) {
  const p = useSurfacePalette();
  return (
    <header
      style={{
        textAlign: 'center',
        borderBottom: `1px solid ${p.divider}`,
        paddingBottom: 16,
        marginBottom: 20,
        overflowWrap: 'anywhere',
      }}
    >
      <h1 style={{ fontFamily: EDITORIAL_FONT, fontSize: 32, margin: 0, color: p.text }}>
        {basics.name}
      </h1>
      <Label p={p}>{basics.label}</Label>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
        <InlineContacts basics={basics} />
      </div>
    </header>
  );
}
