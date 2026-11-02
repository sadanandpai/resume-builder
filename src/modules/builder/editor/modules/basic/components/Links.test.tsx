import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { expect, it } from 'vitest';
import Links from './Links';
import type { ProfileBasics } from '@/templates/components/types';

it('defaults to icons and updates the saved preference when toggled', async () => {
  let saved: ProfileBasics = { profiles: [] };
  function Editor() {
    const [basics, setBasics] = useState(saved);
    return (
      <Links
        basicTabs={basics}
        onChangeHandler={(value, key) => {
          saved = { ...basics, [key]: value };
          setBasics(saved);
        }}
      />
    );
  }
  const user = userEvent.setup();
  const view = render(<Editor />);
  const toggle = screen.getByRole('switch', { name: 'Show URLs beside social icons' });
  expect(toggle).not.toBeChecked();
  await user.click(toggle);
  expect(saved.socialLinksDisplay).toBe('icons-and-url');
  view.unmount();
  render(<Editor />);
  expect(screen.getByRole('switch')).toBeChecked();
  await user.click(screen.getByRole('switch'));
  expect(saved.socialLinksDisplay).toBe('icons');
});
