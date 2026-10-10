import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import Color from 'color';
import { describe, expect, it } from 'vitest';
import ResumeData from '@/templates/test-fixtures/resume-data.json';
import { StandardExperience, TimelineExperience } from './experience';
import { StandardEducation } from './education';
import { BarSkills, ChipSkills } from './skills';
import { SpotlightAwards, AchievementsSection } from './awards';
import { TextSection, ProfileSummarySection } from './text';
import { ProjectsSection } from './projects';
import { ExperienceProfile, ModernProfile } from './profile';
import { ResumeSurface, ResumePresentation, paletteForSurface } from './theme';
import { formatDateRange } from './primitives/formatDateRange';
import type { ResumePalette } from './theme';

const theme = createTheme({ typography: { fontFamily: 'Test Font' } });
Object.assign(theme, {
  backgroundColor: '#ffffff',
  fontColor: '#111111',
  titleColor: '#123456',
  highlighterColor: '#123456',
});
const palette: ResumePalette = {
  primary: '#123456',
  primaryDark: '#102030',
  accent: '#123456',
  text: '#111111',
  muted: '#666666',
  bg: '#ffffff',
  divider: '#dddddd',
  sidebarBg: '#123456',
  sidebarText: '#ffffff',
  headingFont: 'sans-serif',
  bodyFont: 'sans-serif',
};

describe('shared resume collection', () => {
  it('uses ruled headings only when requested and retains the original boxed frames', () => {
    const view = render(
      <ResumePresentation value="ruled">
        <TextSection html="Summary content" title="Summary" />
      </ResumePresentation>
    );
    const heading = screen.getByRole('heading', { name: 'Summary' });
    expect(heading).toHaveStyle({ fontWeight: 500 });
    expect(heading.parentElement?.style.borderBottom).not.toBe('');
    expect(heading.closest('section')?.style.border).toBe('');
    view.rerender(
      <ResumePresentation value="boxed">
        <TextSection html="Summary content" title="Summary" />
      </ResumePresentation>
    );
    const boxedHeading = screen.getByRole('heading', { name: 'Summary' });
    expect(boxedHeading.closest('section')?.style.border).not.toBe('');
    expect(boxedHeading.parentElement?.style.borderBottom).toBe('');
    expect(boxedHeading.style.fontWeight).toBe('');
  });

  it('keeps the existing profile intact and omits relevant experience from the modern profile', () => {
    const view = render(<ExperienceProfile basics={ResumeData.basics} />);
    const originalWebsite = screen.getByRole('link', { name: ResumeData.basics.url });
    expect(originalWebsite.style.textDecoration).toBe('');
    expect(screen.getByText('Total experience: 6 Years')).toBeInTheDocument();
    expect(screen.getByText('Relevant experience: 4 years')).toBeInTheDocument();
    view.rerender(<ModernProfile basics={ResumeData.basics} />);
    const website = screen.getByRole('link', {
      name: ResumeData.basics.url.replace(/^https?:\/\//i, '').replace(/\/$/, ''),
    });
    expect(website).toHaveAttribute('href', ResumeData.basics.url);
    expect(website).toHaveStyle({ textDecoration: 'none' });
    expect(website.parentElement).toHaveTextContent('Experience: 6 Years');
    expect(screen.queryByText('Total experience: 6 Years')).not.toBeInTheDocument();
    expect(screen.queryByText(/Relevant experience/)).not.toBeInTheDocument();
    expect(screen.queryByText('4 years')).not.toBeInTheDocument();
  });

  it('renders typed experience data with defaults, without a resume or editor context', () => {
    render(<StandardExperience items={ResumeData.work} />);
    expect(screen.getByRole('heading', { name: 'Experience' })).toBeInTheDocument();
    expect(screen.getByText('Company 1')).toBeInTheDocument();
    expect(screen.getByText('Apr 2021 – Present')).toBeInTheDocument();
    expect(screen.getByText(/Keep the code quality high/)).toBeInTheDocument();
  });

  it('updates headings, text, and skill indicators when the same design moves surfaces', () => {
    const content = (
      <>
        <StandardExperience items={ResumeData.work} />
        <BarSkills items={[{ name: 'React', level: 70 }]} />
      </>
    );
    const view = render(
      <ThemeProvider theme={theme}>
        <ResumeSurface>{content}</ResumeSurface>
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Experience' })).toHaveStyle({ color: '#123456' });
    view.rerender(
      <ThemeProvider theme={theme}>
        <ResumeSurface surface="sidebar">{content}</ResumeSurface>
      </ThemeProvider>
    );
    expect(screen.getByRole('heading', { name: 'Experience' })).toHaveStyle({ color: '#ffffff' });
    expect(
      screen.getByText('React').parentElement?.nextElementSibling?.firstElementChild
    ).toHaveStyle({ background: '#ffffff' });
    expect(screen.getByText('Senior Software Developer')).toHaveStyle({ color: '#ffffff' });
  });

  it('uses contrasting sidebar tokens even with light custom themes', () => {
    for (const bg of ['#123456', '#ffffff', '#ffff00', '#111111']) {
      const resolved = paletteForSurface({ ...palette, sidebarBg: bg }, 'sidebar');
      for (const foreground of [resolved.text, resolved.primary, resolved.accent]) {
        expect(Color(bg).contrast(Color(foreground))).toBeGreaterThanOrEqual(4.5);
      }
    }
  });

  it('renders no headings or frames for empty section data', () => {
    const { container } = render(
      <>
        <TextSection html="" />
        <ProfileSummarySection html="" image="/profile.png" />
        <StandardExperience items={[]} />
        <StandardEducation items={[]} />
        <BarSkills items={[]} />
        <ChipSkills items={[]} />
        <SpotlightAwards items={[]} />
        <AchievementsSection html="" />
        <ProjectsSection />
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps structured awards separate from rich text achievements', () => {
    render(
      <>
        <SpotlightAwards items={ResumeData.awards} />
        <AchievementsSection html="<ul><li>Rich achievement</li></ul>" />
      </>
    );
    expect(
      screen.getByText('Certificate of best frontend developer – Nov 2016')
    ).toBeInTheDocument();
    expect(screen.getByText('Rich achievement').tagName).toBe('LI');
  });

  it('formats string, Dayjs, null, and invalid dates with current flags consistently', () => {
    expect(formatDateRange('2020-01-01', dayjs('2021-02-01'))).toBe('Jan 2020 – Feb 2021');
    expect(formatDateRange(null, null, true)).toBe('Present');
    expect(formatDateRange(dayjs('2020-01-01'), 'invalid', true)).toBe('Jan 2020 – Present');
    expect(formatDateRange(null, 'invalid')).toBe('');
    render(
      <StandardEducation
        items={[{ ...ResumeData.education[0], isStudyingHere: true, endDate: null }]}
      />
    );
    expect(screen.getByText('Jan 2014 – Present')).toBeInTheDocument();
  });

  it('retains profile photos, social and contact links, and experience information', () => {
    const view = render(<ModernProfile basics={ResumeData.basics} />);
    expect(screen.getByRole('link', { name: 'github' })).toHaveAttribute(
      'href',
      ResumeData.basics.profiles[2].url
    );
    expect(screen.getByRole('link', { name: /janedoe@email.com/ })).toHaveAttribute(
      'href',
      'mailto:janedoe@email.com'
    );
    view.rerender(
      <ResumePresentation value="boxed">
        <ExperienceProfile basics={ResumeData.basics} />
      </ResumePresentation>
    );
    expect(screen.getByText('Relevant experience: 4 years')).toBeInTheDocument();
    expect(screen.getByText('Total experience: 6 Years')).toBeInTheDocument();
  });

  it('keeps timeline duration and profile-summary image flow', () => {
    render(
      <>
        <TimelineExperience items={[ResumeData.work[1]]} />
        <ProfileSummarySection html="Profile summary" image="/profile.png" />
      </>
    );
    expect(screen.getByText('2 years')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Profile' })).toHaveStyle({
      float: 'left',
      shapeOutside: 'circle(50%)',
    });
  });
});
