import React, { ReactNode } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';

import { socialIcons } from '@/helpers/icons';
import { IProfile } from '@/stores/index.interface';

export const ContactLine = ({
  icon,
  text,
  href,
}: {
  icon: ReactNode;
  text: string;
  href?: string;
}) => {
  if (!text) return null;
  const body = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 10.5,
        lineHeight: 1.4,
        overflowWrap: 'anywhere',
      }}
    >
      <span style={{ display: 'inline-flex', width: 12, height: 12 }}>{icon}</span>
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
}: {
  email?: string;
  phone?: string;
  city?: string;
  url?: string;
  inline?: boolean;
  color?: string;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: inline ? 'row' : 'column',
        flexWrap: inline ? 'wrap' : 'nowrap',
        gap: inline ? 12 : 6,
        color: color || 'inherit',
      }}
    >
      <ContactLine icon={<BsTelephone />} text={phone || ''} />
      <ContactLine icon={<BsEnvelope />} text={email || ''} />
      <ContactLine icon={<BsGeoAlt />} text={city || ''} />
      <ContactLine icon={<BsGlobe />} text={url || ''} href={url} />
    </div>
  );
};

export const SocialIconsRow = ({ profiles, color }: { profiles?: IProfile[]; color?: string }) => {
  if (!profiles?.length) return null;
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {profiles.map((p) => {
        const Icon = socialIcons.get(p.network);
        if (!Icon || !p.url) return null;
        return (
          <a
            key={p.network + p.username}
            href={p.url}
            target="_blank"
            rel="noreferrer"
            style={{ color: color || 'inherit', display: 'inline-flex' }}
          >
            <Icon size={13} />
          </a>
        );
      })}
    </div>
  );
};
