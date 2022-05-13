import Image from 'next/image';

function PersonCard(props) {
  return (
    <>
      {props.number == 1 && (
        <div className="px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
          <img
            src="https://avatars.githubusercontent.com/u/12962887?v=4"
            alt="Sadanand Akshay Pai"
            className="rounded-full mb-4 shadow-lg"
            height={'96px'}
            width={'96px'}
          />
          <p className="text-resume-800">
            <strong>Sadanand Akshay Pai</strong>
          </p>
          <p className="text-resume-400 mb-6">Front-end developer</p>
          <div className="flex gap-4">
            <a href="https://github.com/sadanandpai" target="_blank" rel="noreferrer">
              <img src="/icons/github.svg" alt="github" width={'24px'} />
            </a>
            <a href="https://www.linkedin.com/in/sadanandpai/" target="_blank" rel="noreferrer">
              <img src="/icons/linkedin.svg" alt="linkedin" width={'24px'} />
            </a>
          </div>
        </div>
      )}

      {props.number == 2 && (
        <div className="px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
          <img
            src="https://avatars.githubusercontent.com/u/22369081?v=4"
            alt="Gopalakrishnan"
            className="rounded-full mb-4 shadow-lg"
            height={'96px'}
            width={'96px'}
          />
          <p className="text-resume-800">
            <strong>Gopalakrishnan</strong>
          </p>
          <p className="text-resume-400 mb-6">Front-end developer</p>
          <div className="flex gap-4">
            <a href="https://github.com/gopal1996" target="_blank" rel="noreferrer">
              <img src="/icons/github.svg" alt="github" width={'24px'} />
            </a>
            <a href="https://www.linkedin.com/in/gopal1996" target="_blank" rel="noreferrer">
              <img src="/icons/linkedin.svg" alt="linkedin" width={'24px'} />
            </a>
          </div>
        </div>
      )}

      {props.number == 3 && (
        <div className="px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
          <img
            src="https://avatars.githubusercontent.com/u/32408232?v=4"
            alt="Sachin Kumar"
            className="rounded-full mb-4 shadow-lg"
            height={'96px'}
            width={'96px'}
          />
          <p className="text-resume-800">
            <strong>Sachin Kumar</strong>
          </p>
          <p className="text-resume-400 mb-6">Web developer</p>
          <div className="flex gap-4">
            <a href="https://github.com/sachinkumar579" target="_blank" rel="noreferrer">
              <img src="/icons/github.svg" alt="github" width={'24px'} />
            </a>
            <a href="https://www.linkedin.com/in/sachuration/" target="_blank" rel="noreferrer">
              <img src="/icons/linkedin.svg" alt="linkedin" width={'24px'} />
            </a>
          </div>
        </div>
      )}

      {props.number == 4 && (
        <div className="px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
          <img
            src="https://avatars.githubusercontent.com/u/60533560?v=4"
            alt="Siva K"
            className="rounded-full mb-4 shadow-lg"
            height={'96px'}
            width={'96px'}
          />
          <p className="text-resume-800">
            <strong>Siva K</strong>
          </p>
          <p className="text-resume-400 mb-6">Front-end developer</p>
          <div className="flex gap-4">
            <a href="https://github.com/siva-kannan3" target="_blank" rel="noreferrer">
              <img src="/icons/github.svg" alt="github" width={'24px'} />
            </a>
            <a href="https://www.linkedin.com/in/siva-kannan3/" target="_blank" rel="noreferrer">
              <img src="/icons/linkedin.svg" alt="linkedin" width={'24px'} />
            </a>
          </div>
        </div>
      )}

      {props.number == 5 && (
        <div className="px-6 py-8 flex flex-col items-center text-center shadow hover:shadow-xl rounded-xl border-2 border-resume-50 hover:border-resume-100">
          <img
            src="https://avatars.githubusercontent.com/u/26523871?v=4"
            alt="Vivek G"
            className="rounded-full mb-4 shadow-lg"
            height={'96px'}
            width={'96px'}
          />
          <p className="text-resume-800">
            <strong>Vivek G</strong>
          </p>
          <p className="text-resume-400 mb-6">Product designer, half developer</p>
          <div className="flex gap-4">
            <a href="https://github.com/yakshaG" target="_blank" rel="noreferrer">
              <img src="/icons/github.svg" alt="github" width={'24px'} />
            </a>
            <a href="https://www.linkedin.com/in/vivek-g-india" target="_blank" rel="noreferrer">
              <img src="/icons/linkedin.svg" alt="linkedin" width={'24px'} />
            </a>
          </div>
        </div>
      )}
    </>
  );
}

export default PersonCard;
