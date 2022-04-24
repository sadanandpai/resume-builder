// import Image from 'next/image';

export const ProfileContact = ({ src, text, alt }: { src: string; text: string; alt: string }) => {
  return (
    <div>
      {/* <Image src={src} alt={alt} width="12px" height="12px" /> */}
      <p className="text-sm font-normal">{text}</p>
    </div>
  );
};
