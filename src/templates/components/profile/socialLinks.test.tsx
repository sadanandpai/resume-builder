import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CenteredProfile } from './Profiles';
import { ModernProfile } from './ModernProfile';
import { ExperienceProfile } from './ExperienceProfile';
import { SpotlightProfile } from './SpotlightProfile';
import type { ProfileBasics } from '../types';

const url = 'https://github.com/sadanandpai/';
const basics: ProfileBasics = {
  name: 'Sadanand Pai',
  profiles: [
    { network: 'github', username: 'sadanandpai', url },
    { network: 'linkedin', username: '', url: '' },
  ],
};

describe.each([CenteredProfile, ModernProfile, ExperienceProfile, SpotlightProfile])(
  '%s social links',
  (Profile) => {
    it.each([undefined, 'icons', 'icons-and-url'] as const)(
      'renders the requested mode (%s) without duplicate links',
      (socialLinksDisplay) => {
        render(<Profile basics={{ ...basics, socialLinksDisplay }} />);
        const links = screen.getAllByRole('link');
        expect(links).toHaveLength(1);
        expect(links[0]).toHaveAttribute('href', url);
        expect(links[0].querySelector('svg')).not.toBeNull();
        if (socialLinksDisplay === 'icons-and-url') {
          expect(links[0]).toHaveTextContent('github.com/sadanandpai');
        } else {
          expect(links[0]).toHaveTextContent('');
          expect(links[0]).toHaveAccessibleName('github');
        }
      }
    );
  }
);
