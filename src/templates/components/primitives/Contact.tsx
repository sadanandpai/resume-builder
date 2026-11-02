import { bodySize, lineHeight } from '@/helpers/resume-style/styles';
import { ReactNode } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';

import type { SectionProps } from '@/templates/components/types';
import { socialIcons } from '@/helpers/icons';
import type { IProfile } from '@/stores/index.interface';
import { useSurfacePalette } from '@/templates/components/theme';

export const ContactLine = ({
  icon,
  text,
  href,
  density = 'compact',
  size,
  underlineLinks = false,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  density?: SectionProps['density'];
  size?: number;
  underlineLinks?: boolean;
}) => {
  const palette = useSurfacePalette();
  if (!text) return null;
  const body = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: bodySize(size ?? (density === 'comfortable' ? 12 : 10.5)),
        lineHeight: lineHeight(1.4),
        overflowWrap: 'anywhere',
      }}
    >
      <span aria-hidden style={{ display: 'inline-flex', width: 12, height: 12, flexShrink: 0 }}>
        {icon}
      </span>
      <span style={{ minWidth: 0 }}>{text}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{
          color: /^(mailto:|tel:)/i.test(href) ? 'inherit' : palette.accent,
          textDecoration: underlineLinks ? undefined : 'none',
        }}
      >
        {body}
      </a>
    );
  }
  return body;
};

export const ContactBlock = ({
  email,
  phone,
  city,
  url,
  inline,
  color,
  density,
  size,
  underlineLinks = false,
  align = 'left',
}: {
  email?: string;
  phone?: string;
  city?: string;
  url?: string;
  inline?: boolean;
  color?: string;
  density?: SectionProps['density'];
  size?: number;
  underlineLinks?: boolean;
  align?: 'left' | 'center' | 'right';
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: inline ? 'row' : 'column',
        flexWrap: inline ? 'wrap' : 'nowrap',
        gap: inline ? 12 : 6,
        textAlign: align,
        alignItems: !inline && align === 'right' ? 'flex-end' : undefined,
        justifyContent: inline
          ? align === 'center'
            ? 'center'
            : align === 'right'
              ? 'flex-end'
              : undefined
          : undefined,
        color: color || 'inherit',
      }}
    >
      <ContactLine
        underlineLinks={underlineLinks}
        density={density}
        size={size}
        icon={<BsTelephone />}
        text={phone || ''}
        href={phone ? `tel:${phone}` : undefined}
      />
      <ContactLine
        underlineLinks={underlineLinks}
        density={density}
        size={size}
        icon={<BsEnvelope />}
        text={email || ''}
        href={email ? `mailto:${email}` : undefined}
      />
      <ContactLine
        underlineLinks={underlineLinks}
        density={density}
        size={size}
        icon={<BsGeoAlt />}
        text={city || ''}
      />
      <ContactLine
        underlineLinks={underlineLinks}
        density={density}
        size={size}
        icon={<BsGlobe />}
        text={url || ''}
        href={url}
      />
    </div>
  );
};

export const SocialIconsRow = ({
  profiles,
  size = 13,
  fontSize = 11,
  align = 'left',
  underlineLinks = false,
  display = 'icons',
}: {
  profiles?: IProfile[];
  display?: 'icons' | 'icons-and-url';
  align?: 'left' | 'center' | 'right' | 'space-between';
  color?: string;
  size?: number;
  fontSize?: number;
  underlineLinks?: boolean;
}) => {
  const palette = useSurfacePalette();
  if (!profiles?.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent:
          align === 'center'
            ? 'center'
            : align === 'right'
              ? 'flex-end'
              : align === 'space-between'
                ? 'space-between'
                : undefined,
      }}
    >
      {profiles.map((p) => {
        const Icon = socialIcons.get(p.network.toLowerCase());
        if (!p.url) return null;
        return (
          <a
            key={p.network + p.username}
            aria-label={display === 'icons' ? p.network || p.username || p.url : undefined}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: palette.accent,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              minWidth: 0,
              maxWidth: '100%',
              fontSize: bodySize(fontSize),
              overflowWrap: 'anywhere',
              textDecoration: underlineLinks ? undefined : 'none',
            }}
          >
            {Icon ? (
              <Icon size={size} aria-hidden style={{ flexShrink: 0 }} />
            ) : (
              <span>
                {display === 'icons-and-url' ? (
                  <BsGlobe aria-hidden />
                ) : (
                  p.network || p.username || p.url
                )}
              </span>
            )}
            {display === 'icons-and-url' && (
              <span style={{ minWidth: 0 }}>
                {p.url.replace(/^https?:\/\//i, '').replace(/\/$/, '')}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
};
