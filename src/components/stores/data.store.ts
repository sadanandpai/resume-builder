import create from "zustand";
import {
  intro,
  experience,
  skills,
  achievements,
  education,
} from "../common/data";

export const useIntro = create(() => ({
  intro,
}));

export const useExp = create(() => ({
  experience,
}));

export const useAchievements = create(() => ({
  keyProjects: achievements.keyProjects,
  certificates: achievements.certificates,
}));

export const useSkills = create(() => ({
  technical: skills.technical,
  exposure: skills.exposure,
  methodology: skills.methodology,
  tools: skills.tools,
}));

export const useEducation = create(() => ({
  education,
}));
