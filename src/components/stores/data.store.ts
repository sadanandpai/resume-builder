import create from "zustand";
import { intro, social, experience, skills, achievements, education } from "../common/data";

export const useIntro = create((set) => ({
  name: intro.name,
  role: intro.role,
  mobile: intro.mobile,
  email: intro.email,
  location: intro.location,
  experience: intro.experience,
  photo: intro.photo,
  about: intro.about,
  objective: intro.objective,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value;
    }),

  setBlockField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      const [label, value] = field.split("-");
      const introState = {
        ...state,
      };
      introState[label][value] = (<HTMLInputElement>event.target)?.value;
    }),
}));

export const useSocial = create((set) => ({
  linkedin: social.linkedin,
  github: social.github,

  setField: (event: InputEvent) =>
    set((state: any) => {
      const field = (<HTMLElement>event.target).dataset.label;

      if (field === undefined) return;
      state[field] = (<HTMLInputElement>event.target)?.value;
    }),
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
