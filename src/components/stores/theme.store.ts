import create from "zustand";

export const useThemes = create((set) => ({
  theme: {
    fontColor: "black",
    backgroundColor: "white",
    primaryColor: "rgb(0, 123, 255)",
    secondaryColor: "rgb(198 88 123)",
  },

  setDarkMode: () =>
    set(() => {
      return {
        theme: {
          fontColor: "white",
          backgroundColor: "black",
          primaryColor: "yellow",
          secondaryColor: "pink",
        },
      };
    }),
}));
