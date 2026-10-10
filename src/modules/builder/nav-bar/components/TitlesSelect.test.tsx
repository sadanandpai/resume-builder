import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import ResumeData from '@/templates/test-fixtures/resume-data.json';
import { TitlesSelect } from './TitlesSelect';
import { useSectionTitleStore } from '@/stores/useSectionTitleStore';
import { useTemplates } from '@/stores/useTemplate';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

vi.mock('@/stores/useResumeStore', () => ({ useResumeStore: () => ResumeData }));
beforeEach(() => {
  localStorage.clear();
  useSectionTitleStore.setState({ titles: {}, hydrated: false });
  useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES.modern });
});
it('edits visible titles and shows template-specific defaults after switching', () => {
  const view = render(<TitlesSelect />);
  fireEvent.change(screen.getByRole('textbox', { name: 'Summary' }), {
    target: { value: 'About me' },
  });
  expect(useSectionTitleStore.getState().titles.modern.summary).toBe('About me');
  expect(screen.getByRole('textbox', { name: 'Summary' })).toHaveValue('About me');
  view.unmount();
  useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES.classic });
  render(<TitlesSelect />);
  expect(screen.getByRole('textbox', { name: 'Professional Summary' })).toHaveValue(
    'Professional Summary'
  );
});
