import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { LayoutSelect } from './LayoutSelect';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useTemplates } from '@/stores/useTemplate';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

beforeEach(() => {
  localStorage.clear();
  useResumeStyleStore.setState({
    settings: {},
    past: [],
    future: [],
    baseline: null,
    hydrated: true,
  });
  useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES.modern);
});
describe('Layout controls', () => {
  it('leaves defaults unset on focus and blur, accepts empty drafts and recovers invalid values', () => {
    render(<LayoutSelect />);
    const input = screen.getByRole('textbox', { name: 'Body size value' });
    fireEvent.focus(input);
    fireEvent.blur(input);
    expect(useResumeStyleStore.getState().settings).toEqual({});
    fireEvent.change(input, { target: { value: '' } });
    expect(input).toHaveValue('');
    fireEvent.blur(input);
    expect(input).toHaveValue('11');
    fireEvent.change(input, { target: { value: 'oops' } });
    fireEvent.blur(input);
    expect(input).toHaveValue('11');
    fireEvent.change(input, { target: { value: '99' } });
    fireEvent.blur(input);
    expect(useResumeStyleStore.getState().settings.typography?.body).toBe(16);
    expect(useResumeStyleStore.getState().past).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(input).toHaveValue('11');
    fireEvent.click(screen.getByRole('button', { name: 'Redo' }));
    expect(input).toHaveValue('16');
  });
  it('links unequal sides in one undoable action', () => {
    useResumeStyleStore.setState({
      settings: { pageMargins: { top: 5, right: 10, bottom: 15, left: 20 } },
    });
    render(<LayoutSelect />);
    const toggles = screen.getAllByRole('switch');
    fireEvent.click(toggles[0]);
    expect(screen.getByRole('textbox', { name: 'Right value' })).toHaveValue('10');
    fireEvent.click(toggles[0]);
    expect(useResumeStyleStore.getState().settings.pageMargins).toEqual({
      top: 5,
      right: 5,
      bottom: 5,
      left: 5,
    });
    expect(useResumeStyleStore.getState().past).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
    expect(useResumeStyleStore.getState().settings.pageMargins?.right).toBe(10);
  });
  it('hides columns for single-column templates while retaining the global override', () => {
    useResumeStyleStore.setState({ settings: { secondaryColumnPercent: 25 } });
    useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES.classic);
    render(<LayoutSelect />);
    expect(screen.queryByRole('textbox', { name: 'Secondary column value' })).toBeNull();
    expect(useResumeStyleStore.getState().settings.secondaryColumnPercent).toBe(25);
  });
});
