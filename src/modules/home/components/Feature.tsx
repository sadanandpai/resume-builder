import Image from 'next/image';

function FeatureSection() {
  return (
    <>
      <FeatureCard className="lg:rounded-br-[32px]">
        <Image src={'/icons/style.svg'} alt="logo" height="64px" width="64px" />
        <p className="text-xl ml-8 basis-10/12">
          Customise with <strong>templates and themes</strong>!
        </p>
      </FeatureCard>

      <FeatureCard className="lg:rounded-bl-[32px]">
        <p className="text-xl mr-8 basis-10/12">
          Well designed <strong>editor</strong> that helps you build easily
        </p>
        <Image src={'/icons/speed.svg'} alt="logo" height="48px" width="48px" />
      </FeatureCard>

      <FeatureCard className="lg:rounded-tr-[32px]">
        <Image src={'/icons/magic.svg'} alt="logo" height="64px" width="64px" />

        <p className="text-xl ml-8 basis-10/12">
          Go straight to building, no <strong>sign up </strong>needed
        </p>
      </FeatureCard>

      <FeatureCard className="lg:rounded-tl-[32px]">
        <p className="text-xl mr-8 basis-10/12">
          Your <strong>data</strong> never leaves your device
        </p>
        <Image src={'/icons/lock.svg'} alt="logo" height="64px" width="64px" />
      </FeatureCard>
    </>
  );
}

const FeatureCard = ({ children, className }: { children: React.ReactNode; className: string }) => {
  return (
    <div
      className={`transition ease-in-out delay-75
     bg-resume-100 hover:bg-resume-600 text-resume-800
      hover:text-resume-50 fill-resume-800
       hover:fill-resume-100 px-6 lg:px-14 py-6 lg:py-12
        rounded-lg flex justify-between items-center shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default FeatureSection;
