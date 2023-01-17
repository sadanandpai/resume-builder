import { HTMLRenderer } from 'src/helpers/common/components/HTMLRenderer';
import { ProfileImage } from 'src/helpers/common/components/ProfileImage';
import styles from './about.module.css';

export default function AboutMe({
  summary,
  profileImage,
}: {
  summary: string;
  profileImage: string;
}) {
  return (
    <div className="text-[1em]">
      {profileImage.length !== 0 && (
        <ProfileImage
          src={profileImage}
          width={'80px'}
          height={'80px'}
          imageWrapperClassname={`float-left mr-3 mb-1 ${styles.imageWrapShape}`}
        />
      )}
      <HTMLRenderer htmlString={summary} />
    </div>
  );
}
