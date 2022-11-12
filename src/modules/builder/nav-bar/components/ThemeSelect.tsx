import Image from 'next/image';

import { ColorBox, ColorBoxWrapper } from '../atoms';
import { SYSTEM_COLORS } from 'src/helpers/constants/index';
import { IThemeColor } from 'src/helpers/constants/index.interface';
import { useThemes } from 'src/stores/themes';

export const ThemeSelect = () => {
  const activeTheme = useThemes((state) => state.selectedTheme);

  const handleActiveTheme = (themeObject: IThemeColor) => {
    useThemes.getState().chooseTheme(themeObject);
  };

  return (
    <div className={`h-[auto] w-[475px] bg-white flex flex-col px-9 py-7 shadow-2xl`}>
      <span className="text-resume-800 font-bold text-lg mb-2">Choose a resume colour scheme</span>
      <div className="w-full">
        {SYSTEM_COLORS.map((themeObject) => {
          const isActive = themeObject.id === activeTheme.id;
          return (
            <div
              key={themeObject.id}
              className={`flex border rounded mb-[16px] justify-between items-center py-[14px] px-4 ${
                isActive ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
              } hover:cursor-pointer`}
              onClick={() => handleActiveTheme(themeObject)}
            >
              <ColorBoxWrapper>
                <ColorBox bgColor={themeObject.backgroundColor} />
                <ColorBox bgColor={themeObject.fontColor} />
                <ColorBox bgColor={themeObject.titleColor} />
                <ColorBox bgColor={themeObject.highlighterColor} />
              </ColorBoxWrapper>
              {isActive && (
                <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
              )}
            </div>
          );
        })}
      </div>
      {/* <div
        className={`flex flex-col border rounded mb-[16px] justify-start px-4 py-3 hover:cursor-pointer ${
          activeTheme === THEME_IDS.CUSTOM ? 'bg-resume-50 border-resume-500' : 'border-[#a9a9a9]'
        }`}
        onClick={() => handleActiveTheme(THEME_IDS.CUSTOM)}
      >
        <div
          className={`w-full h-full flex items-center justify-between ${
            activeTheme === THEME_IDS.CUSTOM ? 'mb-3' : ''
          }`}
        >
          <span className="text-resume-800 font-normal text-base">Custom theme</span>
          {activeTheme === THEME_IDS.CUSTOM && (
            <Image src={'/icons/selected-tick.svg'} alt="logo" width={'28px'} height={'20px'} />
          )}
        </div>
        {activeTheme === THEME_IDS.CUSTOM && (
          <Fragment>
            <Divider />
            <div className="grid grid-cols-2 grid-rows-2 gap-y-6 gap-x-10 mt-6 mb-8">
              <ColorDetails bgColor={'#FFFFFF'} label="Background Color" />
              <ColorDetails bgColor={'#000000'} label="Font Color" />
              <ColorDetails bgColor={'#0019FD'} label="Accent Color" />
              <ColorDetails bgColor={'#22B34B'} label="Bar Color" />
            </div>
          </Fragment>
        )}
      </div> */}
    </div>
  );
};
