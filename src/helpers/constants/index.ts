interface ThemeObject {
  [key: string]: {
    fontColor: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

export const THEME_IDS = {
  PRIMARY: 'PRIMARY',
  SECONDARY: 'SECONDARY',
  TERTIARY: 'TERTIARY',
  CUSTOM: 'CUSTOM',
};

export const SYSTEM_THEME_OBJECT: ThemeObject = {
  PRIMARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#0019FD',
    secondaryColor: '#22B34B',
  },
  SECONDARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#9F0808',
    primaryColor: '#000000',
    secondaryColor: '#F1A91E',
  },
  TERTIARY: {
    fontColor: '#FFFFFF',
    backgroundColor: '#000000',
    primaryColor: '#217503',
    secondaryColor: '#F556E5',
  },
};
