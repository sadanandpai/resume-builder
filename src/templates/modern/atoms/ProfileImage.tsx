import Image from 'next/image';
import styled from '@emotion/styled';

const RoundedImage = styled.img`
  border-radius: 50%;
  height: 108px;
  width: 108px;
  border: 0.5px solid ${(props) => props.theme.fontColor};
`;

export const ProfileImage = ({ src }: { src: string }) => {
  return (
    <div>
      {src ? (
        <RoundedImage alt="Profile image" src={src} />
      ) : (
        <Image
          className="rounded-full"
          src="/icons/profile.svg"
          alt="profile"
          height="108px"
          width="108px"
        />
      )}
    </div>
  );
};
