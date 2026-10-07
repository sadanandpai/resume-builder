import type { ProfileBasics } from '../types';
import { bodySize, font, padding, roleSize, spacing } from '@/helpers/resume-style/styles';
import { useResumePalette, paletteForSurface } from '../theme';
import { RichText } from '../primitives/RichText';
import { ContactLine } from '../primitives/Contact';
import { BsEnvelopeFill, BsGeoAltFill, BsGlobe, BsPhoneFill } from 'react-icons/bs';
import { socialIcons } from '@/helpers/icons';

export function SpotlightProfile({ basics }: { basics: ProfileBasics }) {
  const base = useResumePalette();
  const p = paletteForSurface(base, 'sidebar');
  const contacts = [
    {
      text: basics.email,
      href: basics.email ? `mailto:${basics.email}` : undefined,
      icon: <BsEnvelopeFill />,
    },
    {
      text: basics.phone,
      href: basics.phone ? `tel:${basics.phone}` : undefined,
      icon: <BsPhoneFill />,
    },
    { text: basics.location?.city, icon: <BsGeoAltFill /> },
    { text: basics.url, href: basics.url, icon: <BsGlobe /> },
    ...(basics.profiles ?? [])
      .filter((profile) =>
        ['linkedin', 'twitter', 'github'].includes(profile.network.toLowerCase())
      )
      .map((profile) => {
        const Icon = socialIcons.get(profile.network.toLowerCase());
        return { text: profile.url, href: profile.url, icon: Icon ? <Icon /> : <BsGlobe /> };
      }),
  ].filter((item) => item.text);
  return (
    <header style={{ background: p.bg, color: p.text, fontFamily: font(p.bodyFont) }}>
      <div
        style={{
          padding: padding('26px 25px 22px'),
          display: 'flex',
          gap: spacing('column', 28),
          alignItems: 'flex-start',
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <h1
            style={{
              margin: 0,
              fontWeight: 400,
              fontSize: roleSize('name', 28),
              fontFamily: font(p.headingFont),
              lineHeight: 1.15,
            }}
          >
            {basics.name}
          </h1>
          {basics.label && (
            <div style={{ color: base.accent, fontSize: bodySize(14), marginTop: 7 }}>
              {basics.label}
            </div>
          )}
          {basics.summary && (
            <div style={{ marginTop: 12 }}>
              <RichText html={basics.summary} p={p} />
            </div>
          )}
        </div>
        {basics.image && (
          <img
            src={basics.image}
            alt={`${basics.name || 'Profile'} portrait`}
            style={{
              width: 118,
              height: 118,
              flexShrink: 0,
              objectFit: 'cover',
              borderRadius: '50%',
              border: `4px solid ${base.accent}`,
            }}
          />
        )}
      </div>
      {contacts.length > 0 && (
        <div
          style={{
            background: base.primaryDark,
            padding: padding('10px 25px'),
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: '9px 28px',
            color: paletteForSurface({ ...base, sidebarBg: base.primaryDark }, 'sidebar').text,
          }}
        >
          {contacts.map((item, index) => (
            <div key={`${item.text}-${index}`} style={{ minWidth: 0 }}>
              <ContactLine text={item.text!} href={item.href} icon={item.icon} />
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
