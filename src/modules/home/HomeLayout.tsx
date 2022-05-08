import Link from 'next/link';
import Image from 'next/image';
import { NavBarActions, StyledButton } from '../builder/nav-bar/atoms';
import { Button } from '@mui/material';

const HomeLayout = () => {
  return (
    <>
      <div className="bg-resume-50">
        <nav className="h-14 w-full bg-resume-800 relative flex py-2.5 pl-40 pr-4 items-center">
          <Image src={'/icons/resume-icon.svg'} alt="logo" height={'36px'} width={'36px'} />
          <div className="flex-auto flex justify-between items-center ml-5">
            <NavBarActions>
              <StyledButton variant="text">Contribute</StyledButton>
              <StyledButton variant="text">About us</StyledButton>
              {/* <StyledButton variant="outlined">Export as PDF</StyledButton> */}
            </NavBarActions>
          </div>
        </nav>

        <div className="mx-32 my-6">
          <div className="flex">
            <Image src={'/icons/resume.png'} alt="resume-3d" height={'380px'} width={'380px'} />
            <div className="mt-14">
              <h1
                className="text-5xl mb-4 text-resume-800"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                Professional Resumes
              </h1>
              <p
                className="text-xl mb-10 text-resume-400"
                style={{ fontFamily: "'Roboto Condensed', serif" }}
              >
                AT ITS SIMPLEST
              </p>
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
                <Button variant="contained" className="bg-resume-800">
                  BUILD YOUR RESUME
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeLayout;
