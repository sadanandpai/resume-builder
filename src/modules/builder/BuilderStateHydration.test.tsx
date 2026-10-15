import { StrictMode } from 'react';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';

afterEach(() => {
  cleanup();
  localStorage.clear();
  vi.restoreAllMocks();
  vi.resetModules();
});

it('restores every middleware store and manual settings once, including Strict Mode and re-entry', async () => {
  const { BuilderStateHydration, hydrateBuilderState, useBuilderStateReady } =
    await import('./BuilderStateHydration');
  const { useBasicDetails } = await import('@/stores/basic');
  const { useThemes } = await import('@/stores/themes');
  const { useTemplates } = await import('@/stores/useTemplate');
  const { useResumeStyleStore } = await import('@/stores/useResumeStyleStore');
  const { useSectionTitleStore } = await import('@/stores/useSectionTitleStore');
  const { useSectionLayoutStore } = await import('@/stores/useSectionLayoutStore');
  const modules = [
    await import('@/stores/experience'),
    await import('@/stores/education'),
    await import('@/stores/awards'),
    await import('@/stores/volunteering'),
    await import('@/stores/activity'),
    await import('@/stores/skills'),
  ];
  const stores = [
    useBasicDetails,
    useThemes,
    useSectionLayoutStore,
    ...modules.flatMap((module) => Object.values(module)),
  ];
  for (const store of stores) {
    expect(store.persist.getOptions().skipHydration).toBe(true);
    const key = store.persist.getOptions().name;
    localStorage.setItem(
      key,
      JSON.stringify({
        state: { ...store.getState(), testMarker: key },
        version: store.persist.getOptions().version ?? 0,
      })
    );
  }
  localStorage.setItem(
    'themes',
    JSON.stringify({ state: { selectedTheme: { id: 2 } }, version: 0 })
  );
  localStorage.setItem('selectedTemplateId', 'classic');
  localStorage.setItem(
    'resumeStyles',
    JSON.stringify({ version: 1, settings: { density: 'compact' } })
  );
  localStorage.setItem(
    'resumeSectionTitles',
    JSON.stringify({ version: 1, titles: { classic: { summary: 'About' } } })
  );
  const read = vi.spyOn(Storage.prototype, 'getItem');
  function Probe() {
    return <span>{useBuilderStateReady() ? 'ready' : 'defaults'}</span>;
  }
  const view = render(
    <StrictMode>
      <BuilderStateHydration>
        <Probe />
      </BuilderStateHydration>
    </StrictMode>
  );
  await waitFor(() => expect(screen.getByText('ready')).toBeInTheDocument());
  expect(useTemplates.getState().activeTemplate.id).toBe('classic');
  expect(useResumeStyleStore.getState().settings.density).toBe('compact');
  expect(useSectionTitleStore.getState().titles.classic.summary).toBe('About');
  expect(useThemes.getState().selectedTheme.id).toBe(1);
  for (const store of stores.filter((s) => s !== useThemes))
    expect(store.getState()).toHaveProperty('testMarker', store.persist.getOptions().name);
  const reads = read.mock.calls.length;
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Live edit' });
  view.unmount();
  render(
    <BuilderStateHydration>
      <Probe />
    </BuilderStateHydration>
  );
  await act(async () => {
    await hydrateBuilderState();
  });
  expect(useBasicDetails.getState().values.name).toBe('Live edit');
  expect(read.mock.calls).toHaveLength(reads);
});

it.each(['malformed', 'blocked'])(
  'finishes boot and supports editing with %s storage',
  async (mode) => {
    const { hydrateBuilderState } = await import('./BuilderStateHydration');
    const { useBasicDetails } = await import('@/stores/basic');
    if (mode === 'malformed') localStorage.setItem('basic', '{broken');
    else {
      vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
        throw new Error('blocked');
      });
      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('blocked');
      });
    }
    await hydrateBuilderState();
    expect(() =>
      useBasicDetails
        .getState()
        .reset({ ...useBasicDetails.getState().values, name: 'Still editable' })
    ).not.toThrow();
    expect(useBasicDetails.getState().values.name).toBe('Still editable');
  }
);

it('keeps old data hidden until server data is applied, including navigation to another ID', async () => {
  const { BuilderStateHydration } = await import('./BuilderStateHydration');
  const { useBasicDetails } = await import('@/stores/basic');
  useBasicDetails.getState().reset({ ...useBasicDetails.getState().values, name: 'Old resume' });
  const rendered: string[] = [];
  function Preview() {
    const name = useBasicDetails((state) => state.values.name);
    rendered.push(name);
    return <div>{name}</div>;
  }
  const view = render(
    <BuilderStateHydration savedResume={{ id: 'first', data: { basics: { name: 'First saved' } } }}>
      <Preview />
    </BuilderStateHydration>
  );
  expect(screen.queryByText('Old resume')).not.toBeInTheDocument();
  await screen.findByText('First saved');
  expect(rendered).not.toContain('Old resume');
  rendered.length = 0;
  view.rerender(
    <BuilderStateHydration
      savedResume={{ id: 'second', data: { basics: { name: 'Second saved' } } }}
    >
      <Preview />
    </BuilderStateHydration>
  );
  await screen.findByText('Second saved');
  expect(rendered).not.toContain('First saved');
});

it('shows a load error without mounting the previous resume', async () => {
  const { BuilderStateHydration } = await import('./BuilderStateHydration');
  render(
    <BuilderStateHydration savedResume={{ id: 'missing', error: 'Resume not found.' }}>
      <div>Previous resume</div>
    </BuilderStateHydration>
  );
  expect(await screen.findByRole('alert')).toHaveTextContent('Resume not found.');
  expect(screen.queryByText('Previous resume')).not.toBeInTheDocument();
});
