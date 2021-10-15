import React from 'react';
import { AiOutlineGithub, AiFillLinkedin, AiOutlineAim, AiFillDelete } from 'react-icons/ai';
import {
  MdVpnKey,
  MdVerifiedUser,
  MdWork,
  MdLocationOn,
  MdCall,
  MdMail,
  MdPermIdentity,
  MdBuild,
  MdEdit,
  MdColorLens,
  MdCloudDownload,
  MdLibraryBooks,
  MdAddCircleOutline,
  MdPeople,
} from 'react-icons/md';
import {
  SiBehance,
  SiCodechef,
  SiCodeforces,
  SiDevDotTo,
  SiDribbble,
  SiExpertsexchange,
  SiHackerearth,
  SiHackerrank,
  SiHashnode,
  SiLeetcode,
  SiSquarespace,
  SiTwitter,
} from 'react-icons/si';
import { FaMediumM, FaUniversity, FaWordpressSimple } from 'react-icons/fa';
import { IoGitBranch } from 'react-icons/io5';
import { GoVerified } from 'react-icons/go';
import { GrDrag } from 'react-icons/gr';

const icons = new Map([
  ['mobile', <MdCall />],
  ['email', <MdMail />],
  ['location', <MdLocationOn />],
  ['github', <AiOutlineGithub />],
  ['linkedin', <AiFillLinkedin />],
  ['hackerrank', <SiHackerrank />],
  ['hackerearth', <SiHackerearth />],
  ['twitter', <SiTwitter />],
  ['leetcode', <SiLeetcode />],
  ['devto', <SiDevDotTo />],
  ['medium', <FaMediumM />],
  ['wordpress', <FaWordpressSimple />],
  ['codechef', <SiCodechef />],
  ['codeforces', <SiCodeforces />],
  ['behance', <SiBehance />],
  ['dribbble', <SiDribbble />],
  ['hashnode', <SiHashnode />],
  ['squarespace', <SiSquarespace />],

  ['about me', <MdPermIdentity />],
  ['technical expertise', <SiExpertsexchange />],
  ['experience', <MdWork />],
  ['education', <FaUniversity />],
  ['tools', <MdBuild />],
  ['key projects / involvements', <MdVpnKey />],
  ['certificates and awards', <MdVerifiedUser />],
  ['career objective', <AiOutlineAim />],
  ['methodology / approach', <IoGitBranch />],
  ['skills / expsoure', <GoVerified />],
  ['edit', <MdEdit fill="#1890ff" />],
  ['color', <MdColorLens fill="#1890ff" />],
  ['download', <MdCloudDownload fill="#1890ff" />],
  ['template', <MdLibraryBooks fill="#1890ff" />],

  ['drag', <GrDrag />],
  ['delete', <AiFillDelete />],
  ['add', <MdAddCircleOutline />],
  ['social', <MdPeople />],
]);

export function getIcon(iconName: string) {
  return icons.get(iconName?.toLowerCase());
}
