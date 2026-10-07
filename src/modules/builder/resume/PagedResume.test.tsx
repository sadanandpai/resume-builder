import { beforeEach, describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PagedResume } from './PagedResume';
import { useResumeStyleStore } from '@/stores/useResumeStyleStore';

beforeEach(() => useResumeStyleStore.setState({ settings: {} }));
describe('A4 geometry', () => {
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
