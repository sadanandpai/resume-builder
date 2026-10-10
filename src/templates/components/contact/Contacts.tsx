import { ContactBlock, SocialIconsRow } from '@/templates/components/primitives/Contact';
import { useSurfacePalette } from '@/templates/components/theme';
import type { ProfileBasics, SectionProps } from '@/templates/components/types';
export type ContactProps = {
  basics: ProfileBasics;
  density?: SectionProps['density'];
  size?: number;
  underlineLinks?: boolean;
  align?: 'left' | 'center' | 'right';
};
function Contacts({
  basics,
  density,
  size,
  underlineLinks,
  align = 'left',
  inline = false,
}: ContactProps & { inline?: boolean }) {
  const p = useSurfacePalette();
  if (
    ![basics.email, basics.phone, basics.url, basics.location?.city].some(Boolean) &&
    !basics.profiles?.some((item) => item.url)
  )
    return null;
  return (
    <div style={{ color: p.text, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ContactBlock
        email={basics.email}
        phone={basics.phone}
        city={basics.location?.city}
        url={basics.url}
        inline={inline}
        density={density}
        size={size}
        underlineLinks={underlineLinks}
        align={align}
      />
      <SocialIconsRow
        profiles={basics.profiles}
        color={p.primary}
        align={align}
        underlineLinks={underlineLinks}
      />
    </div>
  );
}
export const InlineContacts = (props: ContactProps) => <Contacts {...props} inline />;
export const ContactList = (props: ContactProps) => <Contacts {...props} />;
