import Link from 'next/link';
import Image from 'next/image';
import { NavBarActions, StyledButton } from '../builder/nav-bar/atoms';
import FeatureCard from './components/FeatureCard';
import { Button } from '@mui/material';
import 'animate.css';

const HomeLayout = () => {
  return (
    <>
      <div style={{ background: 'linear-gradient(180deg, #E7EEFA 50%, #FFFFFF 100%);' }}>
        <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 px-4 xl:px-60 items-center">
          <Image src={'/icons/resume-icon.png'} alt="logo" height={'36px'} width={'36px'} />
          <div className="flex-auto flex justify-between items-center ml-5">
            <NavBarActions>
              <StyledButton variant="text">Editor</StyledButton>
            </NavBarActions>
            <NavBarActions>
              <StyledButton variant="text">Contribute</StyledButton>
              <StyledButton variant="text">About us</StyledButton>
              {/* <StyledButton variant="outlined">Export as PDF</StyledButton> */}
            </NavBarActions>
          </div>
        </nav>

        <div className="mx-6 md:mx-40 xl:mx-60 my-6">
          <div className="grid grid-cols-12 mt-12 md:mt-24">
            <div className="col-span-12 sm:col-span-4">
              <img
                src={'/icons/resume.png'}
                alt="resume-3d"
                className="animate__animated animate__headShake animate__delay-1s w-6/12 sm:w-9/12"
              />
            </div>
            <div className="col-span-12 sm:col-span-8">
              <h3
                className="text-xl md:text-2xl mb-2 text-resume-400"
                style={{ fontFamily: "'Roboto Condensed', serif" }}
              >
                SIMPLEST WAY TO BUILD A
              </h3>
              <h1
                className="text-5xl mb-12 text-resume-800"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Professional Resume
              </h1>

              <div className="flex mb-10">
                <div
                  style={{
                    backgroundColor: '#2E4052',
                    width: '3px',
                    padding: '1px',
                    borderRadius: '8px',
                  }}
                ></div>
                <p
                  className="text-lg ml-3 text-resume-800"
                  style={{ fontFamily: "'Kalam', serif" }}
                >
                  &ldquo;The secret to getting ahead is getting started&rdquo;
                  <br />
                  —Mark Twain
                </p>
              </div>
              <Link href="/builder" passHref={true}>
                <Button variant="contained" className="bg-resume-800 mb-2">
                  BUILD YOUR RESUME
                </Button>
              </Link>
              <p
                className="xl:invisible text-resume-800"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Desktop screen recommended
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className="mx-6 md:mx-40 xl:mx-60 my-32 w-75"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* These cards are written in JSX because I do not know Typescript */}
          <FeatureCard number={1} />
          <FeatureCard number={2} />
          <FeatureCard number={3} />
          <FeatureCard number={4} />
        </div>
      </div>

      <div className="mx-6 md:mx-40 xl:mx-60 my-32" style={{ fontFamily: "'Roboto Slab', serif" }}>
        <div className="grid grid-cols-12 items-center text-center">
          <div className="col-span-12 lg:col-span-4 mb-4 lg:mb-0">
            <Image src={'/icons/palette.svg'} alt="logo" height={'48px'} width={'48px'} />
            <p className="text-resume-800 text-xl mt-2">
              Do you want to make your own <strong>template?</strong>
            </p>
          </div>
          <div className="col-span-12 lg:col-span-1 mb-4 lg:mb-0 text-resume-800 text-4xl">
            <p>+</p>
          </div>
          <div className="col-span-12 lg:col-span-2 flex-col">
            <Image src={'/icons/terminal.svg'} alt="logo" height={'48px'} width={'48px'} />
            <p className="text-resume-800 text-xl mt-2">
              Do you write <strong>React</strong> code?
            </p>
          </div>
          <div className="invisible lg:visible lg:col-span-2 text-resume-800 text-4xl mx-6">
            <p>=</p>
          </div>
          <div className="col-span-12 lg:col-span-3 mx-auto">
            <Image src={'/icons/wave.svg'} alt="logo" height={'48px'} width={'48px'} />
            <Button variant="contained" className="block bg-resume-800 mt-2 lg:mt-5 mb-3">
              CONTRIBUTE
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
