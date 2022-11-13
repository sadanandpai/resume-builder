import { ProfileContact } from '../atoms/ProfileContact';
import { ProfileName } from '../atoms/ProfileName';
import { SectionSubtitle } from '../atoms/SectionSubtitle';

import { ProfileImage } from 'src/helpers/common/components/ProfileImage';

export const BasicIntro = ({
  name,
  label,
  url,
  email,
  phone,
  city,
  image,
}: {
  name: string;
  label: string;
  url: string;
  email: string;
  phone: string;
  city: string;
  image: string;
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
      <ProfileImage src={image} />
    </div>
  );
};
