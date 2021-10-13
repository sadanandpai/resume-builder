import React from "react";
import { AiOutlineGithub, AiFillLinkedin, AiOutlineAim } from "react-icons/ai";
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
} from "react-icons/md";
import { SiExpertsexchange } from "react-icons/si";
import { FaUniversity } from "react-icons/fa";
import { IoGitBranch } from "react-icons/io5";
import { GoVerified } from "react-icons/go";

const icons = new Map([
  ["mobile", <MdCall />],
  ["email", <MdMail />],
  ["location", <MdLocationOn />],
  ["github", <AiOutlineGithub />],
  ["linkedin", <AiFillLinkedin />],
  ["about me", <MdPermIdentity />],
  ["technical expertise", <SiExpertsexchange />],
  ["experience", <MdWork />],
  ["education", <FaUniversity />],
  ["tools", <MdBuild />],
  ["key projects / involvements", <MdVpnKey />],
  ["certificates and awards", <MdVerifiedUser />],
  ["career objective", <AiOutlineAim />],
  ["methodology / approach", <IoGitBranch />],
  ["skills / expsoure", <GoVerified />],
  ["edit", <MdEdit fill="#1890ff" />],
  ["color", <MdColorLens fill="#1890ff" />],
  ["download", <MdCloudDownload fill="#1890ff" />],
  ["template", <MdLibraryBooks fill="#1890ff" />],
]);

export function getIcon(iconName: string) {
  return icons.get(iconName.toLowerCase());
}
