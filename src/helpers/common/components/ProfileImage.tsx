import Image from 'next/image';
import styled from '@emotion/styled';

const RoundedImage = styled.img`
  border-radius: 50%;
  border: 0.5px solid ${(props) => props.theme.fontColor};
`;

export const ProfileImage = ({
  src,
  height = '108px',
  width = '108px',
  imageWrapperClassname = '',
}: {
  src: string;
  height?: string;
  width?: string;
  imageWrapperClassname?: string;
}) => {
  return (
    <div className={imageWrapperClassname}>
      {src ? (
        <RoundedImage alt="Profile image" src={src} height={height} width={width} />
      ) : (
        <Image
          className="rounded-full"
          src="/icons/profile.svg"
          alt="profile"
          height={height}
          width={width}
        />
      )}
    </div>
  );
};
