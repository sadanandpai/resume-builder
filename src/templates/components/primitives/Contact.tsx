import { bodySize, lineHeight } from '@/helpers/resume-style/styles';
import { ReactNode } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';

import type { SectionProps } from '@/templates/components/types';
import { socialIcons } from '@/helpers/icons';
import type { IProfile } from '@/stores/index.interface';

export const ContactLine = ({
  icon,
  text,
  href,
  density = 'compact',
  size,
  underlineLinks = true,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  density?: SectionProps['density'];
  size?: number;
  underlineLinks?: boolean;
}) => {
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
      <span aria-hidden style={{ display: 'inline-flex', width: 12, height: 12 }}>
        {icon}
      </span>
      <span>{text}</span>
    </span>
  );
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        style={{ color: 'inherit', textDecoration: underlineLinks ? undefined : 'none' }}
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
  underlineLinks = true,
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
  color,
  size = 13,
  align = 'left',
  underlineLinks = true,
}: {
  profiles?: IProfile[];
  align?: 'left' | 'center' | 'right';
  color?: string;
  size?: number;
  underlineLinks?: boolean;
}) => {
  if (!profiles?.length) return null;
  return (
    <div
      style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: align === 'center' ? 'center' : align === 'right' ? 'flex-end' : undefined,
      }}
    >
      {profiles.map((p) => {
        const Icon = socialIcons.get(p.network);
        if (!p.url) return null;
        return (
          <a
            key={p.network + p.username}
            aria-label={p.network || p.username || p.url}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{
              color: color || 'inherit',
              display: 'inline-flex',
              textDecoration: underlineLinks ? undefined : 'none',
            }}
          >
            {Icon ? (
              <Icon size={size} aria-hidden />
            ) : (
              <span>{p.network || p.username || p.url}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};
