import { ContactBlock, SectionHeading, SocialIconsRow } from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import { withAlpha } from '@/templates/common/resumePalette';
import type { IProfile } from '@/stores/index.interface';

type Basics = {
  email?: string;
  phone?: string;
  url?: string;
  location?: { city?: string };
  profiles?: IProfile[];
};

export function ContactCard({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <section
      style={{
        background: withAlpha(p.primary, 0.08),
        padding: 14,
        borderRadius: 10,
        marginBottom: 12,
      }}
    >
      <SectionHeading title="Contact" p={p} variant="bar" />
      <ContactBlock
        email={basics.email}
        phone={basics.phone}
        city={basics.location?.city}
        url={basics.url}
      />
      <div style={{ marginTop: 8 }}>
        <SocialIconsRow profiles={basics.profiles} color={p.primary} />
      </div>
    </section>
  );
}
