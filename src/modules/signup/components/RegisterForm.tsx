import React from 'react';
import { useFormik } from 'formik';
import Router from 'next/router';
import * as Yup from 'yup';
import { Container, Paper, Typography, TextField, Button } from '@mui/material';
import { setToken } from 'src/helpers/utils/helpers';
import { useAuthContext } from 'src/helpers/context/AuthContext';
import UserAPI from 'src/helpers/api/user';

const RegisterForm = () => {
  const { setUser } = useAuthContext();

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const emailParts = values.email.split('@');
        const newUsername = emailParts[0];
        const { data, status } = await UserAPI.register(newUsername, values.email, values.password);
        if (status !== 200) {
        }
        if (data?.user) {
          setToken(data.jwt);
          setUser(data.user);
          Router.push('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs" className="pt-12">
      <Paper
        elevation={3}
        style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h5">Register Form</Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            label="Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            margin="normal"
            type="password"
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <Button
            type="submit"
            variant="contained"
            className="bg-resume-800 mb-2"
            style={{ marginTop: '20px' }}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RegisterForm;
