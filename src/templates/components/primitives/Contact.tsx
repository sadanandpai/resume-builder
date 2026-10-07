import React, { ReactNode } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';

import type { SectionProps } from '../types';
import { socialIcons } from '@/helpers/icons';
import type { IProfile } from '@/stores/index.interface';

export const ContactLine = ({
  icon,
  text,
  href,
  density = 'compact',
}: {
  icon: ReactNode;
  text: string;
  href?: string;
  density?: SectionProps['density'];
}) => {
  if (!text) return null;
  const body = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: density === 'comfortable' ? 12 : 10.5,
        lineHeight: 1.4,
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
      <a href={href} target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>
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
  align = 'left',
}: {
  email?: string;
  phone?: string;
  city?: string;
  url?: string;
  inline?: boolean;
  color?: string;
  density?: SectionProps['density'];
  align?: 'left' | 'right';
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
        justifyContent: inline && align === 'right' ? 'flex-end' : undefined,
        color: color || 'inherit',
      }}
    >
      <ContactLine
        density={density}
        icon={<BsTelephone />}
        text={phone || ''}
        href={phone ? `tel:${phone}` : undefined}
      />
      <ContactLine
        density={density}
        icon={<BsEnvelope />}
        text={email || ''}
        href={email ? `mailto:${email}` : undefined}
      />
      <ContactLine density={density} icon={<BsGeoAlt />} text={city || ''} />
      <ContactLine density={density} icon={<BsGlobe />} text={url || ''} href={url} />
    </div>
  );
};

export const SocialIconsRow = ({ profiles, color }: { profiles?: IProfile[]; color?: string }) => {
  if (!profiles?.length) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
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
            style={{ color: color || 'inherit', display: 'inline-flex' }}
          >
            {Icon ? (
              <Icon size={13} aria-hidden />
            ) : (
              <span>{p.network || p.username || p.url}</span>
            )}
          </a>
        );
      })}
    </div>
  );
};
