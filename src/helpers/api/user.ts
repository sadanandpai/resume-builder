import axios from 'axios';

import { APP_STRAPI_BASE_URL, BEARER } from '../utils/constant';
import { getToken } from '../utils/helpers';

const UserAPI = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${APP_STRAPI_BASE_URL}/auth/local`,
        JSON.stringify({
          identifier: email,
          password: password,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      // return error.response;
    }
    return { data: {}, status: 500 };
  },
  register: async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        `${APP_STRAPI_BASE_URL}/auth/local/register`,
        JSON.stringify({ username, email, password }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return response;
    } catch (error) {
      // return error.response;
    }
    return { data: {}, status: 500 };
  },
  updateUserResume: async (id: number, resume: any) => {
    const token = getToken() || '';

    try {
      const response = await axios.put(
        `${APP_STRAPI_BASE_URL}/users/me`,
        JSON.stringify({ profile: resume }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${BEARER} ${encodeURIComponent(token)}`,
          },
        }
      );
      return response;
    } catch (error) {
      // return error.response;
    }
    return { data: {}, status: 500 };
  },
};

export default UserAPI;
