import { motion, useAnimation } from 'framer-motion';
import LoginForm from 'src/helpers/profile/LoginForm';
import Navbar from 'src/helpers/common/Navbar';
import useSWR from 'swr';
import storage from 'src/helpers/utils/storage';
import checkLogin from 'src/helpers/utils/checkLogin';
import { useEffect } from 'react';
import Router from 'next/router';
import { useAuthContext } from 'src/helpers/context/AuthContext';

const SignInLayout = () => {
  const { user } = useAuthContext();
  const isLoggedIn = checkLogin(user);

  useEffect(() => {
    if (isLoggedIn) {
      Router.push('/');
    }
  }, [isLoggedIn]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1] }} className="scroll-smooth">
      <Navbar />
      <LoginForm />
    </motion.div>
  );
};

export default SignInLayout;
