import React, { useState } from 'react';
import { register, login, logout, signInWithGoogle } from '../helpers/auth';
import { useRouter } from 'next/router';

const Auth: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const redirectTo = (router.query.redirect as string) || '/';

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle(); // Authenticate the user
      router.push(redirectTo); // Redirect to the original page
    } catch (error) {
      alert(`Google Login failed: ${(error as Error).message}`);
    }
  };

  const handleLogin = async () => {
    try {
      await login(email, password); // Authenticate the user
      router.push(redirectTo); // Redirect to the original page
    } catch (error) {
      alert(`Login failed: ${(error as Error).message}`);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => register(email, password)}>Register</button>
      <button onClick={handleLogin}>Login</button>
      <button onClick={logout}>Logout</button>
      <hr />
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
};

export default Auth;
