import Image from 'next/image';
import Maybe from 'src/helpers/common/Maybe';

const persons = [
  {
    name: 'Nhan Nguyen (xGastly)',
    role: 'Backend developer',
    avatar: 'https://avatars.githubusercontent.com/u/29857081?v=4',
    github: 'https://github.com/sadanandpai',
    facebook: 'https://www.facebook.com/nguyennhan09cntt',
  },
  {
    name: 'Chang Chang (xGastly)',
    role: 'Frontend developer',
    avatar: '/icons/changchang.jpg',
    github: '',
    facebook: '',
  },
];

const PersonCard = ({ children }: { children: React.ReactNode }) => (
  <div className="transition ease-in-out delay-100 duration-300 px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
    {children}
  </div>
);

const ProfileSocial = ({ github, facebook }: { github: string; facebook: string }) => (
  <div className="flex gap-4">
    <Maybe test={!!github}>
      <a href={github} target="_blank" rel="noreferrer">
        <Image src="/icons/github.svg" alt="github" width="24" height="24" />
      </a>
    </Maybe>

    <Maybe test={!!facebook}>
      <a href={facebook} target="_blank" rel="noreferrer">
        <Image src="/icons/facebook.svg" alt="facebook" width="24" height="24" />
      </a>
    </Maybe>
  </div>
);

export default function Person() {
  return (
    <>
      {persons.map((person) => (
        <PersonCard key={person.name}>
          <Image
            src={person.avatar}
            alt={person.name}
            className="rounded-full"
            height="96"
            width="96"
          />
          <p className="text-resume-800 mt-4 font-bold">{person.name}</p>
          <p className="text-resume-400 mb-6">{person.role}</p>
          <ProfileSocial github={person.github} facebook={person.facebook} />
        </PersonCard>
      ))}
    </>
  );
}
