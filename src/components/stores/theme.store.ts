import create from "zustand";
import { blue, gold, lime, magenta, red } from "@ant-design/colors";

const themes = [
  {
    fontColor: "black",
    backgroundColor: "white",
    primaryColor: blue.primary,
    secondaryColor: lime[6],
  },
  {
    fontColor: magenta[8],
    backgroundColor: "white",
    primaryColor: lime[9],
    secondaryColor: gold.primary,
  },
  {
    fontColor: "black",
    backgroundColor: "white",
    primaryColor: "green",
    secondaryColor: red[3],
  },
  {
    fontColor: "white",
    backgroundColor: "black",
    primaryColor: "yellow",
    secondaryColor: "skyblue",
  },
];

export const useThemes = create((set) => ({
  theme: themes[0],

  setTheme: (index: number) => set({ theme: themes[index] }),
}));
