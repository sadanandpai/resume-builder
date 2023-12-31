import axios from 'axios';
import { APP_STRAPI_BASE_URL, APP_STRAPI_KEY, BEARER } from './constant';
import { getToken } from './helpers';

const updateOptions = () => {
  if (typeof window === 'undefined') return {};

  if (!window.localStorage.user) return {};

  if (Object.keys(window.localStorage.user).length === 0) return {};

  const user = JSON.parse(window.localStorage.user);

  if (!!user.token) {
    return {
      headers: {
        Authorization: `Token ${user.token}`,
      },
    };
  }

  return {};
};

const strapiOptions = () => {
  let token = getToken();
  if (!token) {
    token = APP_STRAPI_KEY;
  }

  return {
    headers: {
      Authorization: `${BEARER} ${token}`,
    },
  };
};

export default async function (url: string) {
  let options = {};
  if (url.includes(APP_STRAPI_BASE_URL)) {
    options = strapiOptions();
  } else {
    options = updateOptions();
  }
  const { data } = await axios.get(url, options);

  return data;
}
