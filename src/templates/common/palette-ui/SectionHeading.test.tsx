import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import type { ResumePalette } from '@/templates/common/resumePalette';

import { SectionHeading } from './SectionHeading';

const palette: ResumePalette = {
  primary: '#123456',
  primaryDark: '#0f2942',
  accent: '#abcdef',
  text: '#111111',
  muted: '#666666',
  bg: '#ffffff',
  divider: '#dddddd',
  sidebarBg: '#123456',
  sidebarText: '#ffffff',
  headingFont: 'sans-serif',
  bodyFont: 'sans-serif',
};

describe('SectionHeading', () => {
  it('renders its title with heading semantics', () => {
    render(<SectionHeading title="Projects" p={palette} />);

    expect(screen.getByRole('heading', { name: 'Projects', level: 3 })).toBeInTheDocument();
  });

  it('applies the requested alignment and caps treatment', () => {
    render(<SectionHeading title="Experience" p={palette} variant="caps" align="center" />);

    expect(screen.queryByRole('heading', { name: 'Projects' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Experience' })).toHaveStyle({
      textAlign: 'center',
      textTransform: 'uppercase',
    });
  });
});
