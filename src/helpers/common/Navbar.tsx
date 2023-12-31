import { NavBarActions, StyledButton } from 'src/modules/builder/nav-bar/atoms';
import { BsGithub } from 'react-icons/bs';
import Image from 'next/image';
import Link from 'next/link';
import checkLogin from '../utils/checkLogin';
import Maybe from './Maybe';
import { removeToken } from '../utils/helpers';
import { useRouter } from 'next/router';
import { useAuthContext } from '../context/AuthContext';
import { resetResumeStore } from 'src/stores/useResumeStore';
import { Typography } from '@mui/material';

const Navbar = () => {
  const { user, setUser } = useAuthContext();
  const isLoggedIn = checkLogin(user);
  const router = useRouter();

  const handleLogout = async () => {
    removeToken();
    setUser(null);
    await new Promise<void>((resolve) => {
      resetResumeStore();
      resolve();
    });
    router.push('/');
  };

  return (
    <nav className="sticky top-0 z-20 h-14 w-full bg-resume-800 flex py-2.5 px-4 xl:px-60 items-center shadow-level-8dp">
      <Link href="/">
        <Image src={'/icons/resume-icon.png'} alt="logo" height="36" width="36" />
      </Link>
      <div className="flex-auto flex justify-between items-center ml-5">
        <Maybe test={isLoggedIn}>
          <NavBarActions>
            <Link href="/builder" passHref={true}>
              <StyledButton variant="text">Editor</StyledButton>
            </Link>
          </NavBarActions>
        </Maybe>
        <Maybe test={!isLoggedIn}>
          <NavBarActions>
            <Link href="/" passHref={true}>
              <StyledButton variant="text">E-Resume</StyledButton>
            </Link>
          </NavBarActions>
        </Maybe>
        <NavBarActions>
          <Maybe test={!isLoggedIn}>
            <Link href="/sign-in" passHref={true}>
              <StyledButton variant="text" className="max-md:hidden">
                Login
              </StyledButton>
            </Link>
            <Link href="/signup" passHref={true}>
              <StyledButton variant="text" className="max-md:hidden">
                Register
              </StyledButton>
            </Link>
            <Link href="#about-us" passHref={true}>
              <StyledButton variant="text">About us</StyledButton>
            </Link>
            <a
              href={'https://github.com/xGastly/resume-builder'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsGithub className="h-6 w-6" fill="white" />
            </a>
          </Maybe>

          <Maybe test={isLoggedIn}>
            <Typography variant="h6" color="inherit" sx={{ marginRight: '15px', color: 'white' }}>
              Hello, {user?.username}!
            </Typography>
            <StyledButton variant="text" onClick={handleLogout}>
              Logout
            </StyledButton>
          </Maybe>
        </NavBarActions>
      </div>
    </nav>
  );
};
export default Navbar;
