import { BsGlobe } from 'react-icons/bs';
import { bodySize } from '@/helpers/resume-style/styles';
import { ContactList } from '../contact';
import { ContactLine, SocialIconsRow } from '../primitives/Contact';
import { SectionFrame } from '../primitives/SectionFrame';
import { useSurfacePalette } from '../theme';
import type { ProfileBasics } from '../types';
export function ModernProfile({ basics }: { basics: ProfileBasics }) {
  const p = useSurfacePalette();
  return (
    <SectionFrame
      title={basics.name || 'Profile'}
      heading="profile"
      headerActions={
        basics.profiles?.some((profile) => profile.url) ? (
          <SocialIconsRow
            profiles={basics.profiles}
            color={p.primary}
            size={20}
            underlineLinks={false}
          />
        ) : undefined
      }
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 14,
          flexWrap: 'wrap',
          fontSize: bodySize(11),
        }}
      >
        <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <div style={{ color: p.primary, fontSize: bodySize(14), fontWeight: 500 }}>
            {basics.label}
          </div>
          {basics.totalExp && <div>Experience: {basics.totalExp}</div>}
          <ContactLine
            density="comfortable"
            size={11}
            underlineLinks={false}
            icon={<BsGlobe />}
            text={(basics.url || '').replace(/^https?:\/\//i, '').replace(/\/$/, '')}
            href={basics.url}
          />
        </div>
        <div style={{ marginLeft: 'auto', minWidth: 0, maxWidth: '100%' }}>
          <ContactList
            basics={{
              ...basics,
              url: '',
              profiles: [],
            }}
            size={11}
            underlineLinks={false}
            density="comfortable"
            align="right"
          />
        </div>
      </div>
    </SectionFrame>
  );
}
