import { AiFillGithub } from 'react-icons/ai';
import { AiFillLinkedin } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import {
  FaBehance,
  FaBlog,
  FaDribbble,
  FaHackerrank,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { SiCodechef } from 'react-icons/si';
import { SiHackerearth } from 'react-icons/si';
import { SiLeetcode } from 'react-icons/si';

export const socialIcons = new Map([
  ['linkedin', AiFillLinkedin],
  ['github', AiFillGithub],
  ['twitter', AiOutlineTwitter],
  ['hackerrank', FaHackerrank],
  ['hackerearth', SiHackerearth],
  ['codechef', SiCodechef],
  ['leetcode', SiLeetcode],
  ['blog', FaBlog],
  ['behance', FaBehance],
  ['dribbble', FaDribbble],
  ['youtube', FaYoutube],
  ['instagram', FaInstagram],
]);
