import React, { useState } from 'react';
import { AuthContext } from 'src/helpers/context/AuthContext';

import { APP_STRAPI_BASE_URL, BEARER } from 'src/helpers/utils/constant';
import { useEffect } from 'react';
import { getToken } from 'src/helpers/utils/helpers';

const AuthProvider = ({ children }: { children: any }) => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${APP_STRAPI_BASE_URL}/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const data = await response.json();

      setUserData(data);
    } catch (error) {
      console.error(error);
      // message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: any) => {
    setUserData(user);
  };

  useEffect(() => {
    const authToken = getToken();

    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user: userData, setUser: handleUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
