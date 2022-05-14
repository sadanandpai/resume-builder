import Image from 'next/image';

function FeatureCard(props) {
  return (
    <>
      {props.number == 1 && (
        <div className="bg-resume-100 hover:bg-resume-200 px-6 lg:px-14 py-6 lg:py-12 rounded-lg flex justify-between items-center shadow-lg lg:rounded-br-[32px]">
          <Image src={'/icons/style.svg'} alt="logo" height={'64px'} width={'64px'} />
          <p className="text-resume-800 text-xl ml-8 basis-10/12">
            With <strong>templates and themes</strong>, make it yours!
          </p>
        </div>
      )}

      {props.number == 2 && (
        <div className="bg-resume-100 hover:bg-resume-200 px-6 lg:px-14 py-6 lg:py-12 rounded-lg flex justify-between items-center shadow-lg lg:rounded-bl-[32px]">
          <p className="text-resume-800 text-xl basis-10/12">
            Go straight to building, no <strong>sign up </strong>needed
          </p>
          <Image src={'/icons/magic.svg'} alt="logo" height={'64px'} width={'64px'} />
        </div>
      )}

      {props.number == 3 && (
        <div className="bg-resume-100 hover:bg-resume-200 px-6 lg:px-14 py-6 lg:py-12 rounded-lg flex justify-between items-center shadow-lg lg:rounded-tr-[32px]">
          <Image src={'/icons/code.svg'} alt="logo" height={'64px'} width={'64px'} />
          <p className="text-resume-800 text-xl ml-8 basis-10/12">
            We love <strong>open source</strong>, we hope you do too!
          </p>
        </div>
      )}

      {props.number == 4 && (
        <div className="bg-resume-100 hover:bg-resume-200 px-6 lg:px-14 py-6 lg:py-12 rounded-lg flex justify-between items-center shadow-lg lg:rounded-tl-[32px]">
          <p className="text-resume-800 text-xl basis-10/12">
            Your <strong>data</strong> never leaves your device
          </p>
          <Image src={'/icons/lock.svg'} alt="logo" height={'64px'} width={'64px'} />
        </div>
      )}
    </>
  );
}

export default FeatureCard;
