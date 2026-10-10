import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PagedResume } from './PagedResume';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';
import { useTemplates } from '@/stores/useTemplate';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

beforeEach(() => useResumeStyleStore.setState({ settings: {} }));
describe('A4 geometry', () => {
  it('uses the former compact styles as Modern’s balanced baseline', () => {
    useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES.modern });
    const { rerender } = render(<PagedResume>Content</PagedResume>);
    const content = screen.getByRole('region').firstElementChild as HTMLElement;
    expect(useResumeStyleStore.getState().settings.density).toBeUndefined();
    expect(content.style.getPropertyValue('--resume-density')).toBe('0.8');
    expect(content.style.getPropertyValue('--resume-line-factor')).toBe('0.95');
    useResumeStyleStore.getState().preset('compact');
    rerender(<PagedResume>Content</PagedResume>);
    expect(Number(content.style.getPropertyValue('--resume-density'))).toBeCloseTo(0.64);
    useResumeStyleStore.getState().preset('spacious');
    rerender(<PagedResume>Content</PagedResume>);
    expect(Number(content.style.getPropertyValue('--resume-density'))).toBeCloseTo(0.96);
    useResumeStyleStore.getState().preset('balanced');
    useTemplates.setState({ activeTemplate: AVAILABLE_TEMPLATES.classic });
    rerender(<PagedResume>Content</PagedResume>);
    expect(content.style.getPropertyValue('--resume-density')).toBe('');
  });
  it('insets the page without external margins and scopes typography to its content', () => {
    useResumeStyleStore.setState({
      settings: {
        pageMargins: { top: 5, right: 10, bottom: 15, left: 20 },
        typography: { body: 14 },
      },
    });
    render(
      <PagedResume>
        <p>Resume content</p>
      </PagedResume>
    );
    const page = screen.getByRole('region', { name: 'Resume page 1' });
    expect(page.style.padding).toBe('5mm 10mm 15mm 20mm');
    expect(page.style.boxSizing).toBe('border-box');
    expect(page.style.margin).toBe('');
    expect(page.firstElementChild?.getAttribute('style')).toContain('--resume-body: 14px');
  });
});
