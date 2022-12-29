export interface IThemeColor {
  backgroundColor: string;
  fontColor: string;
  titleColor: string;
  highlighterColor: string;
  id: number;
}

export interface ITemplate {
  [key: string]: {
    id: string;
    name: string;
    thumbnail: string;
    component: React.ComponentType;
  };
}

export interface ITemplateContent {
  id: string;
  name: string;
  thumbnail: string;
  component: React.ComponentType;
}
