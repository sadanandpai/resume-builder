import React, { CSSProperties, ReactNode } from 'react';
import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';
import { HTMLRenderer } from '@/helpers/common/components/HTMLRenderer';
import { IProfile } from '@/stores/index.interface';
import { dateParser } from '@/helpers/utils';
import { socialIcons } from '@/helpers/icons';
import type { ResumePalette } from './resumePalette';
import { withAlpha } from './resumePalette';

export const formatDateRange = (
  start: string | null | undefined,
  end: string | null | undefined,
  isCurrent?: boolean
) => {
  const s = start ? dateParser(start) : '';
  const e = isCurrent ? 'Present' : end ? dateParser(end) : '';
  if (s && e) return `${s} – ${e}`;
  return s || e || '';
};

export const SectionHeading = ({
  title,
  p,
  variant = 'bar',
  align = 'left',
}: {
  title: string;
  p: ResumePalette;
  variant?: 'bar' | 'underline' | 'pill' | 'line' | 'caps';
  align?: 'left' | 'center';
}) => {
  const baseStyle: CSSProperties = {
    color: p.primary,
    fontFamily: p.headingFont,
    fontWeight: 700,
    letterSpacing: variant === 'caps' ? '0.14em' : '0.04em',
    textTransform: variant === 'caps' ? 'uppercase' : 'none',
    fontSize: variant === 'caps' ? 11 : 13,
    margin: '0 0 8px 0',
    textAlign: align,
  };

  if (variant === 'bar') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
        <span style={{ width: 14, height: 3, background: p.accent, borderRadius: 2 }} />
        <h3
          style={{
            ...baseStyle,
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontSize: 11,
          }}
        >
          {title}
        </h3>
      </div>
    );
  }
  if (variant === 'underline') {
    return (
      <h3
        style={{
          ...baseStyle,
          borderBottom: `2px solid ${p.accent}`,
          paddingBottom: 3,
          textTransform: 'uppercase',
          fontSize: 11,
        }}
      >
        {title}
      </h3>
    );
  }
  if (variant === 'pill') {
    return (
      <h3
        style={{
          ...baseStyle,
          display: 'inline-block',
          background: p.primary,
          color: '#fff',
          padding: '3px 10px',
          borderRadius: 999,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.14em',
        }}
      >
        {title}
      </h3>
    );
  }
  if (variant === 'line') {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, margin: '0 0 8px 0' }}>
        <h3
          style={{
            ...baseStyle,
            margin: 0,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            fontSize: 11,
          }}
        >
          {title}
        </h3>
        <span style={{ flex: 1, height: 1, background: p.divider }} />
      </div>
    );
  }
  return <h3 style={baseStyle}>{title}</h3>;
};

export const RichText = ({ html, p }: { html: string; p: ResumePalette }) => {
  return (
    <div style={{ color: p.text, fontSize: 11, lineHeight: 1.5, fontFamily: p.bodyFont }}>
      <HTMLRenderer htmlString={html} />
    </div>
  );
};

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

export const ProfileAvatar = ({
  src,
  size = 72,
  radius = '50%',
  border,
}: {
  src?: string;
  size?: number;
  radius?: string;
  border?: string;
}) => {
  if (!src) return null;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: 'hidden',
        flexShrink: 0,
        border: border || 'none',
        background: '#e5e7eb',
      }}
    >
      <img src={src} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  );
};

export const SkillBar = ({ name, level, p }: { name: string; level: number; p: ResumePalette }) => {
  const pct = Math.max(0, Math.min(100, level > 5 ? level : (level / 5) * 100));
  return (
    <div style={{ marginBottom: 6 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10.5,
          marginBottom: 3,
        }}
      >
        <span>{name}</span>
        <span style={{ color: p.muted }}>{Math.round(pct)}%</span>
      </div>
      <div style={{ height: 4, background: p.divider, borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: p.accent, borderRadius: 2 }} />
      </div>
    </div>
  );
};

export const SkillDots = ({
  name,
  level,
  p,
  total = 5,
}: {
  name: string;
  level: number;
  p: ResumePalette;
  total?: number;
}) => {
  const norm = level > 5 ? Math.round((level / 100) * total) : level;
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 10.5,
        marginBottom: 4,
      }}
    >
      <span>{name}</span>
      <span style={{ display: 'inline-flex', gap: 3 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: i < norm ? p.accent : p.divider,
              display: 'inline-block',
            }}
          />
        ))}
      </span>
    </div>
  );
};

export const ChipList = ({
  items,
  p,
  variant = 'outline',
}: {
  items: { name: string }[];
  p: ResumePalette;
  variant?: 'outline' | 'filled' | 'soft';
}) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
      {items.map((item, idx) => {
        const base: CSSProperties = {
          fontSize: 10,
          padding: '2px 8px',
          borderRadius: 999,
          lineHeight: 1.4,
          whiteSpace: 'nowrap',
        };
        let style: CSSProperties = { ...base };
        if (variant === 'filled') style = { ...base, background: p.primary, color: '#fff' };
        else if (variant === 'soft')
          style = { ...base, background: withAlpha(p.accent, 0.18), color: p.primaryDark };
        else style = { ...base, border: `1px solid ${p.divider}`, color: p.text };
        return (
          <span key={idx} style={style}>
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export const SkillBarThick = ({
  name,
  level,
  p,
  height = 8,
}: {
  name: string;
  level: number;
  p: ResumePalette;
  height?: number;
}) => {
  const pct = Math.max(0, Math.min(100, level > 5 ? level : (level / 5) * 100));
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 10.5,
          marginBottom: 4,
        }}
      >
        <span>{name}</span>
      </div>
      <div style={{ height, background: p.divider, borderRadius: 3 }}>
        <div style={{ width: `${pct}%`, height: '100%', background: p.primary, borderRadius: 3 }} />
      </div>
    </div>
  );
};

export const SkillStars = ({
  name,
  level,
  p,
  total = 5,
}: {
  name: string;
  level: number;
  p: ResumePalette;
  total?: number;
}) => {
  const filled =
    level > 5
      ? Math.min(total, Math.round((level / 100) * total))
      : Math.min(total, Math.max(0, Math.round(level)));
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 10.5,
        marginBottom: 5,
      }}
    >
      <span>{name}</span>
      <span style={{ color: p.accent, letterSpacing: 1, fontSize: 12 }} aria-hidden>
        {Array.from({ length: total }).map((_, i) => (
          <span key={i}>{i < filled ? '★' : '☆'}</span>
        ))}
      </span>
    </div>
  );
};

export const SkillDotGrid = ({
  name,
  level,
  p,
}: {
  name: string;
  level: number;
  p: ResumePalette;
}) => {
  const pct = Math.max(0, Math.min(100, level > 5 ? level : (level / 5) * 100));
  const filled = Math.round((pct / 100) * 10);
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ fontSize: 10.5, marginBottom: 4 }}>{name}</div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4, maxWidth: 120 }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: i < filled ? p.primary : p.divider,
              display: 'block',
              margin: '0 auto',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const SectionRule = ({
  p,
  thick,
  color,
}: {
  p: ResumePalette;
  thick?: boolean;
  color?: string;
}) => (
  <hr
    style={{
      border: 'none',
      borderTop: `${thick ? 3 : 1}px solid ${color || p.primary}`,
      margin: '12px 0',
      opacity: thick ? 1 : 0.85,
    }}
  />
);
