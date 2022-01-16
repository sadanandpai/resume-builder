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
  MdLibraryBooks,
  MdAddCircleOutline,
  MdPeople,
  MdLabel,
  MdZoomOut,
  MdZoomIn,
  MdSave,
  MdCloudUpload,
  MdPrint,
} from 'react-icons/md';
import {
  SiBehance,
  SiCodechef,
  SiCodeforces,
  SiDevdotto,
  SiDribbble,
  SiExpertsexchange,
  SiHackerearth,
  SiHashnode,
  SiLeetcode,
  SiSquarespace,
  SiTwitter,
} from 'react-icons/si';
import { FaAward, FaMediumM, FaUniversity, FaWordpressSimple, FaHackerrank } from 'react-icons/fa';
import { IoGitBranch, IoReload } from 'react-icons/io5';
import { GoVerified } from 'react-icons/go';
import { GrDrag } from 'react-icons/gr';

const icons = new Map([
  ['mobile', <MdCall />],
  ['email', <MdMail />],
  ['location', <MdLocationOn />],
  ['github', <AiOutlineGithub />],
  ['linkedin', <AiFillLinkedin />],
  ['hackerrank', <FaHackerrank />],
  ['hackerearth', <SiHackerearth />],
  ['twitter', <SiTwitter />],
  ['leetcode', <SiLeetcode />],
  ['devto', <SiDevdotto />],
  ['medium', <FaMediumM />],
  ['wordpress', <FaWordpressSimple />],
  ['codechef', <SiCodechef />],
  ['codeforces', <SiCodeforces />],
  ['behance', <SiBehance />],
  ['dribbble', <SiDribbble />],
  ['hashnode', <SiHashnode />],
  ['squarespace', <SiSquarespace />],

  ['identity', <MdPermIdentity />],
  ['expert', <SiExpertsexchange />],
  ['work', <MdWork />],
  ['education', <FaUniversity />],
  ['tool', <MdBuild />],
  ['key', <MdVpnKey />],
  ['certificate', <MdVerifiedUser />],
  ['career', <AiOutlineAim />],
  ['branch', <IoGitBranch />],
  ['skill', <GoVerified />],
  ['edit', <MdEdit />],
  ['color', <MdColorLens />],
  ['print', <MdPrint />],
  ['template', <MdLibraryBooks />],

  ['drag', <GrDrag />],
  ['delete', <AiFillDelete />],
  ['add', <MdAddCircleOutline />],
  ['social', <MdPeople />],
  ['label', <MdLabel />],
  ['awards', <FaAward />],
  ['zoomin', <MdZoomIn />],
  ['zoomout', <MdZoomOut />],
  ['save', <MdSave />],
  ['upload', <MdCloudUpload />],
  ['reset', <IoReload />],
]);

export function getIcon(iconName: string) {
  return icons.get(iconName?.toLowerCase());
}
