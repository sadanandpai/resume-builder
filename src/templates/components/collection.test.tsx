import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import dayjs from 'dayjs';
import Color from 'color';
import { describe, expect, it } from 'vitest';
import ResumeData from '@/helpers/constants/resume-data.json';
import { StandardExperience, TimelineExperience } from './experience';
import { StandardEducation } from './education';
import { BarSkills, ChipSkills, DotSkills, ListSkills } from './skills';
import { AwardsSection, AchievementsSection } from './awards';
import { TextSection, ProfileSummarySection } from './text';
import { ProjectsSection } from './projects';
import { VolunteerSection } from './volunteer';
import { InlineProfile, BandProfile, CardProfile, ExperienceProfile } from './profile';
import { ContactCard } from './contact';
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
        <DotSkills items={[{ name: 'TypeScript', level: 80 }]} />
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
    expect(screen.getByText('TypeScript').nextElementSibling?.firstElementChild).toHaveStyle({
      background: '#ffffff',
    });
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
        <DotSkills items={[]} />
        <ListSkills items={[]} />
        <AwardsSection items={[]} />
        <AchievementsSection html="" />
        <ProjectsSection />
        <VolunteerSection items={[]} />
        <ContactCard basics={{}} />
      </>
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('keeps structured awards separate from rich text achievements', () => {
    render(
      <>
        <AwardsSection items={ResumeData.awards} />
        <AchievementsSection html="<ul><li>Rich achievement</li></ul>" />
      </>
    );
    expect(screen.getByText('Certificate of best frontend developer')).toBeInTheDocument();
    expect(screen.getByText('Nov 2016')).toBeInTheDocument();
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
    const view = render(<InlineProfile basics={ResumeData.basics} />);
    expect(screen.getByRole('img', { name: 'avatar' })).toHaveAttribute(
      'src',
      ResumeData.basics.image
    );
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

  it('establishes internal contrasting surfaces for colored profiles', () => {
    render(
      <ThemeProvider theme={theme}>
        <BandProfile basics={ResumeData.basics} />
        <CardProfile basics={{ name: 'Second Person' }} />
      </ThemeProvider>
    );
    for (const heading of screen.getAllByRole('heading', { level: 1 }))
      expect(heading).toHaveStyle({ color: '#ffffff' });
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
