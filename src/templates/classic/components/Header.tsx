import { BsEnvelope, BsGeoAlt, BsGlobe, BsTelephone } from 'react-icons/bs';

import { ContactLine } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';

type Basics = {
  name: string;
  label: string;
  phone?: string;
  email?: string;
  url?: string;
  location?: { city?: string };
};

export function Header({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <div
      style={{
        textAlign: 'center',
        borderBottom: `2px solid ${p.primary}`,
        paddingBottom: 14,
        marginBottom: 18,
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: p.headingFont,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: '0.01em',
          color: p.primary,
        }}
      >
        {basics.name}
      </h1>
      <div
        style={{
          fontSize: 12,
          color: p.muted,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginTop: 4,
        }}
      >
        {basics.label}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 18,
          marginTop: 10,
          color: p.muted,
          fontSize: 10.5,
          flexWrap: 'wrap',
        }}
      >
        {basics.phone && <ContactLine icon={<BsTelephone />} text={basics.phone} />}
        {basics.email && <ContactLine icon={<BsEnvelope />} text={basics.email} />}
        {basics.location?.city && <ContactLine icon={<BsGeoAlt />} text={basics.location.city} />}
        {basics.url && <ContactLine icon={<BsGlobe />} text={basics.url} href={basics.url} />}
      </div>
    </div>
  );
}
