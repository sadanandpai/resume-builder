export interface ThemeColorIntf {
  fontColor: string;
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  id: number;
}

export interface ITemplate {
  name: string;
  thumbnail: string;
  component: React.ComponentType;
}
