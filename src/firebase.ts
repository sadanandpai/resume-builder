import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDJARj1cO7G1O6WdqNiPWG1g1CdgvAlS-s',
  authDomain: 'resume-builder-a60ed.firebaseapp.com',
  projectId: 'resume-builder-a60ed',
  storageBucket: 'resume-builder-a60ed.firebasestorage.app',
  messagingSenderId: '702040118233',
  appId: '1:702040118233:web:549923133895907611ffc8',
  measurementId: 'G-NV8WV25SVF',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
