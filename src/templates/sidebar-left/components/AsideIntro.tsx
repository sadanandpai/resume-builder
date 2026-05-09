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

export function AsideIntro({
  basics,
  resumePalette,
  sidePalette,
}: {
  basics: Basics;
  resumePalette: ResumePalette;
  sidePalette: ResumePalette;
}) {
  return (
    <>
      <ProfileAvatar src={basics.image} size={96} border={`3px solid ${resumePalette.accent}`} />
      <div>
        <SectionHeading title="Contact" p={sidePalette} variant="line" />
        <ContactBlock
          email={basics.email}
          phone={basics.phone}
          city={basics.location?.city}
          url={basics.url}
          color={resumePalette.sidebarText}
        />
        <div style={{ marginTop: 10 }}>
          <SocialIconsRow profiles={basics.profiles} color={resumePalette.sidebarText} />
        </div>
      </div>
    </>
  );
}
