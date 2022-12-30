import Image from 'next/image';

function PersonSection() {
  return (
    <>
      <PersonCard>
        <PersonProfile
          src="https://avatars.githubusercontent.com/u/12962887?v=4"
          alt="Sadanand Akshay Pai"
        />
        <ProfileName name="Sadanand Akshay Pai" />
        <ProfileRole role="Front-end developer" />

        <ProfileSocial
          github="https://github.com/sadanandpai"
          linkedin="https://www.linkedin.com/in/sadanandpai/"
        />
      </PersonCard>

      <PersonCard>
        <PersonProfile
          src="https://avatars.githubusercontent.com/u/22369081?v=4"
          alt="Gopalakrishnan"
        />
        <ProfileName name="Gopalakrishnan" />
        <ProfileRole role="Front-end developer" />

        <ProfileSocial
          github="https://github.com/gopal1996"
          linkedin="https://www.linkedin.com/in/gopal1996"
        />
      </PersonCard>

      <PersonCard>
        <PersonProfile src="https://avatars.githubusercontent.com/u/26523871?v=4" alt="Vivek G" />
        <ProfileName name="Vivek G" />
        <ProfileRole role="Product designer, half developer" />

        <ProfileSocial
          github="https://github.com/yakshaG"
          linkedin="https://www.linkedin.com/in/vivek-g-india"
        />
      </PersonCard>

      <PersonCard>
        <PersonProfile src="https://avatars.githubusercontent.com/u/60533560?v=4" alt="Siva K" />
        <ProfileName name="Siva K" />
        <ProfileRole role="Front-end developer" />

        <ProfileSocial
          github="https://github.com/siva-kannan3"
          linkedin="https://www.linkedin.com/in/siva-kannan3/"
        />
      </PersonCard>

      <PersonCard>
        <PersonProfile
          src="https://avatars.githubusercontent.com/u/32408232?v=4"
          alt="Sachin Kumar"
        />
        <ProfileName name="Sachin Kumar" />
        <ProfileRole role="Web developer" />

        <ProfileSocial
          github="https://github.com/sachinkumar579"
          linkedin="https://www.linkedin.com/in/sachuration"
        />
      </PersonCard>
    </>
  );
}

const PersonCard = ({ children }: { children: React.ReactNode }) => (
  <div className="transition ease-in-out delay-100 duration-300 px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
    {children}
  </div>
);

const PersonProfile = ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} className="rounded-full shadow-lg" height="96px" width="96px" />
);

const ProfileName = ({ name }: { name: string }) => (
  <p className="text-resume-800 mt-4">
    <strong>{name}</strong>
  </p>
);

const ProfileRole = ({ role }: { role: string }) => <p className="text-resume-400 mb-6">{role}</p>;

const ProfileSocial = ({ github, linkedin }: { github: string; linkedin: string }) => (
  <div className="flex gap-4">
    <a href={github} target="_blank" rel="noreferrer">
      <Image src="/icons/github.svg" alt="github" width="24px" height="24px" />
    </a>
    <a href={linkedin} target="_blank" rel="noreferrer">
      <Image src="/icons/linkedin.svg" alt="linkedin" width="24px" height="24px" />
    </a>
  </div>
);

export default PersonSection;
