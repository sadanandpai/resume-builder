import { beforeEach, describe, expect, it } from 'vitest';
import { useSectionTitleStore } from './useSectionTitleStore';

beforeEach(() => {
  localStorage.clear();
  useSectionTitleStore.setState({ titles: {}, hydrated: false });
});

describe('template section titles', () => {
  it('persists and restores titles independently for each template', () => {
    const store = useSectionTitleStore.getState();
    store.setTitle('modern', 'summary', 'About me');
    store.setTitle('classic', 'summary', 'Profile');
    useSectionTitleStore.setState({ titles: {}, hydrated: false });
    store.hydrate();
    expect(useSectionTitleStore.getState().titles).toEqual({
      modern: { summary: 'About me' },
      classic: { summary: 'Profile' },
    });
    store.resetTemplate('modern');
    expect(useSectionTitleStore.getState().titles).toEqual({ classic: { summary: 'Profile' } });
  });

  it('ignores malformed and unknown stored fields', () => {
    localStorage.setItem(
      'resumeSectionTitles',
      JSON.stringify({
        version: 1,
        titles: { modern: { summary: 42, work: 'Employment', unknown: 'Other' }, unknown: {} },
      })
    );
    useSectionTitleStore.getState().hydrate();
    expect(useSectionTitleStore.getState().titles).toEqual({ modern: { work: 'Employment' } });
  });
});
