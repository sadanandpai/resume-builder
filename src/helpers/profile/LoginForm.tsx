import Router from 'next/router';
import React, { ChangeEvent, Fragment } from 'react';
import UserAPI from 'src/helpers/api/user';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';
import { motion, useAnimation } from 'framer-motion';
import { setToken } from '../utils/helpers';
import { useAuthContext } from '../context/AuthContext';

const LoginForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { setUser } = useAuthContext();

  const animationEffectsFirstLoad = {
    scale: [0.9, 1],
    opacity: [0, 1],
  };
  const transtionEffects = {
    type: 'spring',
    stiffness: 400,
    damping: 17,
  };

  const handleEmailChange = React.useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = React.useCallback((e) => setPassword(e.target.value), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, status } = await UserAPI.login(email, password);
      if (status !== 200) {
        setErrors(data.errors);
      }

      if (data?.user) {
        setToken(data.jwt);
        setUser(data.user);
        Router.push('/');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="pt-12">
      <Paper
        elevation={3}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h5">Login Form</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={handleEmailChange}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-resume-800 mb-2"
            style={{ marginTop: '20px' }}
          >
            Summit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
