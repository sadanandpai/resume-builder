// helpers/useAuth.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../firebase';

const useAuth = (): User | null | undefined => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return user;
};

export default useAuth;
