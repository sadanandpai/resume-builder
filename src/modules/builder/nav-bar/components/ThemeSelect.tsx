import Image from 'next/image';
import { Divider } from '@mui/material';
import { Fragment, useState } from 'react';

export const ThemeSelectPopover = () => {
  const [activeTheme, setActiveTheme] = useState<string>(THEME_LIST.ONE);

  const handleActiveTheme = (themeName: string) => {
    setActiveTheme(themeName);
  };

  return (
    <div
      className={`fixed h-[510px] w-[475px] bg-white flex flex-col top-100 left-[40px] px-7 pt-6 pb-4 shadow-2xl`}
    >
      <span className="text-[#2E4052] font-bold">Choose a theme</span>
      <div className="mt-1.5 w-full">
        {Object.keys(MOCK_THEME).map((themeName) => {
          const themeObject = MOCK_THEME[themeName];
          const isActive = themeName === activeTheme;
          return (
            <div
              key={themeName}
              className={`flex border rounded mb-[16px] justify-between items-center px-4 py-3 last:mb-2 ${
                isActive ? 'bg-[#E7EEFA] border-[#59748F]' : 'border-[#a9a9a9]'
              }`}
              onClick={() => handleActiveTheme(themeName)}
            >
              <ColorBoxWrapper>
                <ColorBox bgColor={themeObject.fontColor} />
                <ColorBox bgColor={themeObject.backgroundColor} />
                <ColorBox bgColor={themeObject.primaryColor} />
                <ColorBox bgColor={themeObject.secondaryColor} />
              </ColorBoxWrapper>
              {isActive && (
                <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
              )}
            </div>
          );
        })}
      </div>
      <div
        className={`flex flex-col border rounded mb-[16px] justify-start px-4 py-3 last:mb-2 ${
          activeTheme === THEME_LIST.CUSTOM ? 'bg-[#E7EEFA] border-[#59748F]' : 'border-[#a9a9a9]'
        }`}
        onClick={() => handleActiveTheme(THEME_LIST.CUSTOM)}
      >
        <div className="w-full h-full flex items-center justify-between">
          <span className="text-[#2E4052] font-normal text-sm">Custom theme</span>
          {activeTheme === THEME_LIST.CUSTOM && (
            <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
          )}
        </div>
        {activeTheme === THEME_LIST.CUSTOM && (
          <Fragment>
            <Divider className="mt-3" />
            <div className="grid grid-cols-2 grid-rows-2 gap-y-6 gap-x-7 mt-4 mb-2">
              <ColorDetails bgColor={'red'} label="Background Color" />
              <ColorDetails bgColor={'blue'} label="Font Color" />
              <ColorDetails bgColor={'green'} label="Background Color" />
              <ColorDetails bgColor={'violet'} label="Background Color" />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};

interface ThemeObject {
  [key: string]: {
    fontColor: string;
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
  };
}

const THEME_LIST = {
  ONE: 'ONE',
  SECONDARY: 'SECONDARY',
  THREE: 'THREE',
  CUSTOM: 'CUSTOM',
};

const MOCK_THEME: ThemeObject = {
  ONE: {
    fontColor: 'white',
    backgroundColor: 'blue',
    primaryColor: 'red',
    secondaryColor: 'violet',
  },
  TWO: {
    fontColor: 'white',
    backgroundColor: 'blue',
    primaryColor: 'red',
    secondaryColor: 'violet',
  },
  THREE: {
    fontColor: 'white',
    backgroundColor: '#232232',
    primaryColor: 'red',
    secondaryColor: 'violet',
  },
};

const ColorBox = ({ bgColor }: { bgColor: string }) => {
  return <div className={'w-8 h-5 '} style={{ backgroundColor: bgColor }} />;
};

const ColorBoxWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex shadow-[0_0_2px_0_rgba(0_0_0/0.5)] ">{children}</div>;
};

const ColorDetails = ({ label, bgColor }: { label: string; bgColor: string }) => {
  return (
    <div className="flex items-center w-100 gap-3">
      <ColorBoxWrapper>
        <ColorBox bgColor={bgColor} />
      </ColorBoxWrapper>
      <span className="text-xs text-[#2E4052]">{label}</span>
    </div>
  );
};
