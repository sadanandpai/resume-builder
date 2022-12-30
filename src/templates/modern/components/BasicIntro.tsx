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
    <div className="flex justify-between items-center p-2">
      <div>
        <ProfileName name={name} />
        <SectionSubtitle label={label} />
        <div className="flex gap-3">
          <ProfileContact text={phone} />
          <ProfileContact text={email} />
          <ProfileContact text={url} />
          <ProfileContact text={city} />
        </div>
      </div>
      <ProfileImage src={image} height="100px" width="100px" />
    </div>
  );
};
