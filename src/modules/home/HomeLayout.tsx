import { NavBarActions, StyledButton } from '../builder/nav-bar/atoms';
import { motion, useAnimation } from 'framer-motion';

import { BsGithub } from 'react-icons/bs';
import { Button } from '@mui/material';
import FeatureSection from './components/Feature';
import Image from 'next/image';
import Link from 'next/link';
import Person from './components/Person';
import Navbar from 'src/helpers/common/Navbar';

const HomeLayout = () => {
  const controls = useAnimation();
  const animationEffectsHoverEnter = { scale: 1.05 };
  const animationEffectsHoverLeave = { scale: 1 };
  const animationEffectsFirstLoad = {
    scale: [0.9, 1],
    opacity: [0, 1],
  };
  const transtionEffects = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <Navbar />
      <div
        style={{
          background: 'linear-gradient(180deg, #E7EEFA 50%, #FFFFFF 100%)',
          fontFamily: "'Roboto Slab', serif",
        }}
      >
        <div className="mx-6 md:mx-40 xl:mx-60 mb-6">
          <motion.div
            className="grid grid-cols-12 pt-12 md:pt-24"
            initial={{ opacity: 0 }}
            animate={animationEffectsFirstLoad}
            transition={transtionEffects}
          >
            <div className="col-span-12 sm:col-span-4">
              <motion.img
                id="resume-3d"
                src="/resume.webp"
                alt="resume-3d"
                className="w-6/12 sm:w-9/12"
                onMouseEnter={() => {
                  controls.start(animationEffectsHoverEnter, transtionEffects);
                }}
                onMouseLeave={() => {
                  controls.start(animationEffectsHoverLeave, transtionEffects);
                }}
                animate={controls}
              />
            </div>
            <div className="col-span-12 sm:col-span-8">
              <h3 className="text-xl md:text-2xl mb-2 text-resume-400">SIMPLEST WAY TO BUILD A</h3>
              <h1 className="text-5xl mb-12 text-resume-800">Professional Resume</h1>

              <div className="flex mb-10">
                <div className="bg-resume-800 w-1 rounded-lg"></div>
                <p className="text-lg ml-3 text-resume-800">
                  LeBlanc&apos;s Law: &ldquo;Later Equals Never&rdquo;. Let&apos;s begin right away!
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
          </motion.div>
        </div>
      </div>

      <motion.div
        className="mx-6 md:mx-40 xl:mx-60 my-32 w-75"
        style={{ fontFamily: "'Roboto Slab', serif" }}
        initial={{ opacity: 0 }}
        animate={animationEffectsFirstLoad}
        transition={transtionEffects}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <FeatureSection />
        </div>
      </motion.div>

      <div
        id="about-us"
        className="mx-6 md:mx-40 xl:mx-60 my-32"
        style={{ fontFamily: "'Roboto Slab', serif" }}
      >
        <h2 className="text-resume-800 text-3xl mb-2 text-center lg:text-left">About us</h2>
        <p className="text-resume-400 mb-8 text-center lg:text-left">
          A community of developers passionate about crafting free tools to support and foster the
          growth of the Vietnamese developer community!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Person />
        </div>
      </div>
    </motion.div>
  );
};

export default HomeLayout;
