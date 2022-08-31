export interface ThemeObject {
  [key: string]: {
    fontColor: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export interface ThemeIDs {
  [key: string]: string;
}

export interface ITemplate {
  name: string;
  thumbnail: string;
  component: React.ComponentType;
}
