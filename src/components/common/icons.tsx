import React from "react";
import { AiOutlineGithub } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import { MdLocationOn } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { MdMail } from "react-icons/md";
import { SiExpertsexchange } from "react-icons/si";
import { MdPermIdentity } from "react-icons/md";
import { FaUniversity } from "react-icons/fa";
import { MdBuild } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { MdVerifiedUser } from "react-icons/md";
import { AiOutlineAim } from "react-icons/ai";
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
]);

export function getIcon(iconName: string) {
  return icons.get(iconName?.toLowerCase());
}
