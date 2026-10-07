import Color from 'color';

import { ColorBox, ColorBoxWrapper } from '../atoms';

import { IThemeColor } from '@/helpers/constants/index.interface';
import Image from '@/helpers/common/components/Image';
import { SYSTEM_COLORS } from '@/helpers/constants/index';
import { useThemes } from '@/stores/themes';

const CUSTOM_COLOR_FIELDS = [
  ['backgroundColor', 'Background'],
  ['fontColor', 'Text'],
  ['titleColor', 'Headings'],
  ['highlighterColor', 'Highlights'],
] as const;

export const ThemeSelect = () => {
  const activeTheme = useThemes((state) => state.selectedTheme);
  const customTheme = useThemes((state) => state.customTheme);
  const updateCustomTheme = useThemes((state) => state.updateCustomTheme);

  const handleActiveTheme = (themeObject: IThemeColor) => {
    useThemes.getState().chooseTheme(themeObject);
  };

  return (
    <div className={`h-auto md:w-[475px] bg-white flex flex-col px-9 py-7 shadow-2xl`}>
      <span className="text-resume-800 font-bold text-sm md:text-lg mb-2">
        Choose a resume colour scheme
      </span>
      <div className="w-full">
        {[...SYSTEM_COLORS, customTheme].map((themeObject, index) => {
          const isActive = themeObject.id === activeTheme.id;
          return (
            <button
              type="button"
              aria-label={
                index === SYSTEM_COLORS.length ? 'Custom colours' : `Colour scheme ${index + 1}`
              }
              aria-pressed={isActive}
              key={themeObject.id}
              className={`w-full flex border rounded mb-[16px] justify-between items-center py-[14px] px-4 ${
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
              {index === SYSTEM_COLORS.length && <span className="text-sm ml-3">Custom</span>}
              {isActive && (
                <Image src={'/icons/selected-tick.svg'} alt="logo" width="28" height="20" />
              )}
            </button>
          );
        })}
        {activeTheme.id === customTheme.id && (
          <div className="grid grid-cols-2 gap-4">
            {CUSTOM_COLOR_FIELDS.map(([field, label]) => (
              <label
                key={field}
                className="flex items-center justify-between gap-2 text-sm text-resume-800"
              >
                {label}
                <input
                  type="color"
                  aria-label={`${label} colour`}
                  value={Color(customTheme[field]).hex()}
                  onChange={(event) => updateCustomTheme({ [field]: event.target.value })}
                  className="h-9 w-12 cursor-pointer rounded border border-gray-300 bg-white p-1"
                />
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
