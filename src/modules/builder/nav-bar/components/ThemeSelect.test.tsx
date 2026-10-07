import { beforeEach, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { CUSTOM_THEME_COLOR, SYSTEM_COLORS } from '@/helpers/constants';
import { useThemes } from '@/stores/themes';
import { ThemeSelect } from './ThemeSelect';

beforeEach(() => {
  localStorage.clear();
  useThemes.setState({ selectedTheme: SYSTEM_COLORS[0], customTheme: CUSTOM_THEME_COLOR });
});

it('applies custom colours and retains them across preset switches and rehydration', async () => {
  render(<ThemeSelect />);
  expect(screen.getAllByRole('button')).toHaveLength(2);
  fireEvent.click(screen.getByRole('button', { name: 'Custom colours' }));
  fireEvent.change(screen.getByLabelText('Headings colour'), { target: { value: '#123456' } });
  expect(useThemes.getState().selectedTheme.titleColor).toBe('#123456');

  fireEvent.click(screen.getByRole('button', { name: 'Colour scheme 1' }));
  expect(useThemes.getState().selectedTheme).toEqual(SYSTEM_COLORS[0]);
  fireEvent.click(screen.getByRole('button', { name: 'Custom colours' }));
  expect(screen.getByLabelText('Headings colour')).toHaveValue('#123456');

  const savedTheme = localStorage.getItem('themes');
  useThemes.setState({ selectedTheme: SYSTEM_COLORS[0], customTheme: CUSTOM_THEME_COLOR });
  localStorage.setItem('themes', savedTheme!);
  await useThemes.persist.rehydrate();
  expect(useThemes.getState().selectedTheme.titleColor).toBe('#123456');
  expect(useThemes.getState().customTheme.titleColor).toBe('#123456');
});

it.each([2, 3])('replaces saved preset %s with the first palette', async (id) => {
  const customTheme = { ...CUSTOM_THEME_COLOR, titleColor: '#123456' };
  localStorage.setItem(
    'themes',
    JSON.stringify({
      state: { selectedTheme: { ...SYSTEM_COLORS[0], id }, customTheme },
      version: 0,
    })
  );
  await useThemes.persist.rehydrate();
  expect(useThemes.getState().selectedTheme).toEqual(SYSTEM_COLORS[0]);
  expect(useThemes.getState().customTheme).toEqual(customTheme);
});
