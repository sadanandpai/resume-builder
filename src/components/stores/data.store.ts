import create from "zustand";
import {
  intro,
  experience,
  skills,
  achievements,
  education,
} from "../common/data";

export const useIntro = create((set) => ({
  intro,
}));

export const useExp = create((set) => ({
  experience,
}));

export const useAchievements = create((set) => ({
  keyProjects: achievements.keyProjects,
  certificates: achievements.certificates,
}));

export const useSkills = create((set) => ({
  technical: skills.technical,
  exposure: skills.exposure,
  methodology: skills.methodology,
  tools: skills.tools,
}));

export const useEducation = create((set) => ({
  education,
}));
