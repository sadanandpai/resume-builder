import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { auth } from '../firebase';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    alert(`Welcome ${user.displayName}!`);
    return user;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const register = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const login = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
};
