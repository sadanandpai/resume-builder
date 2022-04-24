import { ProfileContact } from '../atoms/ProfileContact';
import { ProfileImage } from '../atoms/ProfileImage';
import { ProfileName } from '../atoms/ProfileName';
import { SectionSubtitle } from '../atoms/SectionSubtitle';

export const BasicIntro = ({
  name,
  label,
  url,
  email,
  phone,
  city,
}: {
  name: string;
  label: string;
  url: string;
  email: string;
  phone: string;
  city: string;
}) => {
  return (
    <div className="flex justify-between items-center p-3">
      <div>
        <ProfileName name={name} />
        <SectionSubtitle label={label} />
        <div className="flex gap-3">
          <ProfileContact src="text" text={phone} alt="Phone" />
          <ProfileContact src="text" text={email} alt="email" />
          <ProfileContact src="text" text={url} alt="website" />
          <ProfileContact src="text" text={city} alt="location" />
        </div>
      </div>
      <ProfileImage />
    </div>
  );
};
