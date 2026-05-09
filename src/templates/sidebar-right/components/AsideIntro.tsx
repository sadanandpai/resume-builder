import {
  ContactBlock,
  ProfileAvatar,
  SectionHeading,
  SocialIconsRow,
} from '@/templates/common/palette-ui';
import type { ResumePalette } from '@/templates/common/resumePalette';
import type { IProfile } from '@/stores/index.interface';

type Basics = {
  image?: string;
  email?: string;
  phone?: string;
  url?: string;
  location?: { city?: string };
  profiles?: IProfile[];
};

export function AsideIntro({ basics, p }: { basics: Basics; p: ResumePalette }) {
  return (
    <>
      <ProfileAvatar src={basics.image} size={88} />
      <div style={{ marginTop: 12 }}>
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
      </div>
    </>
  );
}
