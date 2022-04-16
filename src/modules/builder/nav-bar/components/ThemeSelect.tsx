import Image from 'next/image';
import { Divider } from '@mui/material';
import { Fragment, useState } from 'react';

import { ColorBox, ColorBoxWrapper, ColorDetails } from '../atoms';
import { THEME_IDS, SYSTEM_THEME_OBJECT } from 'src/helpers/constants/index';

export const ThemeSelectPopover = () => {
  const [activeTheme, setActiveTheme] = useState<string>(THEME_IDS.ONE);

  const handleActiveTheme = (themeName: string) => {
    setActiveTheme(themeName);
  };

  return (
    <div className={`h-[510px] w-[475px] bg-white flex flex-col px-9 py-7 shadow-2xl`}>
      <span className="text-resume-800 font-bold text-lg mb-2">Choose a theme</span>
      <div className="w-full">
        {Object.keys(SYSTEM_THEME_OBJECT).map((themeName) => {
          const themeObject = SYSTEM_THEME_OBJECT[themeName];
          const isActive = themeName === activeTheme;
          return (
            <div
              key={themeName}
              className={`flex border rounded mb-[16px] justify-between items-center py-[14px] px-4 ${
                isActive ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
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
        className={`flex flex-col border rounded mb-[16px] justify-start px-4 py-3 ${
          activeTheme === THEME_IDS.CUSTOM ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
        }`}
        onClick={() => handleActiveTheme(THEME_IDS.CUSTOM)}
      >
        <div className="w-full h-full flex items-center justify-between">
          <span className="text-resume-800 font-normal text-base">Custom theme</span>
          {activeTheme === THEME_IDS.CUSTOM && (
            <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
          )}
        </div>
        {activeTheme === THEME_IDS.CUSTOM && (
          <Fragment>
            <Divider className="mt-3" />
            <div className="grid grid-cols-2 grid-rows-2 gap-y-6 gap-x-10 mt-6 mb-8">
              <ColorDetails bgColor={'#FFFFFF'} label="Background Color" />
              <ColorDetails bgColor={'#000000'} label="Font Color" />
              <ColorDetails bgColor={'#0019FD'} label="Accent Color" />
              <ColorDetails bgColor={'#22B34B'} label="Bar Color" />
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
};
