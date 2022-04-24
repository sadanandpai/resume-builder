import Image from 'next/image';

export const ProfileImage = () => {
  return (
    <div>
      <Image
        className="rounded-full"
        src="/icons/profile.svg"
        alt="profile"
        height="108px"
        width="108px"
      />
    </div>
  );
};
