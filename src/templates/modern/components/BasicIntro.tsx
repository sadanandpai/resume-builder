import { BsGlobe } from 'react-icons/bs';
import { ProfileContact } from '../atoms/ProfileContact';
import { ProfileImage } from '@/helpers/common/components/ProfileImage';
import { ProfileName } from '../atoms/ProfileName';
import { SectionSubtitle } from '../atoms/SectionSubtitle';
import { IProfiles } from 'src/stores/basic.interface';
import React from 'react';
import { socialIcons } from 'src/helpers/icons';

function SocialIcons({ profiles }: { profiles: IProfiles[] }) {
  return (
    <div className="social-icons flex">
      {profiles.map((profile) => {
        const Icon = socialIcons.get(profile.network);

        return (
          Icon &&
          profile.url && (
            <a
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
              key={profile.network}
            >
              <Icon className="h-5 w-5 bg-white" />
            </a>
          )
        );
      })}
    </div>
  );
}
export const BasicIntro = ({
  name,
  label,
  url,
  email,
  phone,
  city,
  image,
  profiles,
}: {
  name: string;
  label: string;
  url: string;
  email: string;
  phone: string;
  city: string;
  image: string;
  profiles?: IProfiles[];
}) => {
  const isProfileLinkAvailable =
    profiles &&
    profiles.some((profile) => (profile.url.length > 0 ? true : false)) &&
    !image.length;
  return (
    <div
      className={`flex justify-between ${
        isProfileLinkAvailable ? 'items-end' : 'items-center'
      }  p-2`}
    >
      <div>
        <ProfileName name={name} />
        <SectionSubtitle label={label} />
        <div className="flex gap-3">
          <ProfileContact text={phone} />
          <ProfileContact text={email} />
          <ProfileContact text={city} />
          {url && (
            <div className="flex gap-2 ml-2 items-center">
              <BsGlobe />
              <ProfileContact text={url} />
            </div>
          )}
        </div>
      </div>
      <ProfileImage src={image} height="100px" width="100px" />
      {isProfileLinkAvailable && <SocialIcons profiles={profiles} />}
    </div>
  );
};
