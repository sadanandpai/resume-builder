import { useCloudResumeStore } from '@/stores/useCloudResumeStore';
import { applyImportedResumeJson } from './applyImportedResume';
import { resetResumeStore } from '@/stores/useResumeStore';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { GLOBAL_MUI_THEME } from '@/styles/global.theme';
import exportFromJSON from 'export-from-json';
import NavBarLayout from './NavBarLayout';

vi.mock('export-from-json', () => ({
  default: Object.assign(vi.fn(), { types: { json: 'json' } }),
}));
vi.mock('./ImportSavedResume', () => ({ ImportSavedResume: () => null }));
vi.mock('./components/TemplateSelect', () => ({ TemplateSelect: () => null }));
vi.mock('./components/ThemeSelect', () => ({ ThemeSelect: () => null }));
vi.mock('./components/LayoutSelect', () => ({ LayoutSelect: () => null }));
vi.mock('./components/TitlesSelect', () => ({ TitlesSelect: () => null }));

beforeEach(() => {
  useCloudResumeStore.getState().setId(null);
  vi.clearAllMocks();
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'saved-resume-id' }),
    })
  );
});

describe('Export options', () => {
  it('opens the popover without saving and downloads locally only when selected', async () => {
    render(
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <NavBarLayout importControllerRef={{ current: null }} />
      </ThemeProvider>
    );
    fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
    expect(fetch).not.toHaveBeenCalled();
    expect(exportFromJSON).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Download to device' }));
    await waitFor(() => expect(exportFromJSON).toHaveBeenCalledOnce());
    expect(fetch).not.toHaveBeenCalled();
    expect(vi.mocked(exportFromJSON).mock.calls[0][0]).toMatchObject({
      exportType: 'json',
      data: { basics: expect.any(Object), __metadata: expect.any(Object) },
    });
  });

  it('saves to cloud and displays the ID without downloading', async () => {
    render(
      <ThemeProvider theme={GLOBAL_MUI_THEME}>
        <NavBarLayout importControllerRef={{ current: null }} />
      </ThemeProvider>
    );
    fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
    expect(
      await screen.findByDisplayValue(
        new URL('/builder/saved-resume-id?view=true', window.location.origin).href
      )
    ).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledWith('/api/resumes', expect.objectContaining({ method: 'POST' }));
    expect(exportFromJSON).not.toHaveBeenCalled();
  });
});

it('shows a loader and prevents repeated exports while saving', async () => {
  let finish!: (value: unknown) => void;
  vi.mocked(fetch).mockReturnValue(
    new Promise((resolve) => {
      finish = (value) => resolve(value as Response);
    }) as Promise<Response>
  );
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  const savingButton = screen.getByRole('button', { name: /Saving/ });
  expect(savingButton).toBeDisabled();
  expect(screen.getByRole('progressbar', { name: 'Saving resume' })).toBeInTheDocument();
  fireEvent.click(savingButton);
  expect(fetch).toHaveBeenCalledOnce();
  await act(async () => {
    finish({ ok: true, json: async () => ({ id: 'saved-resume-id' }) });
  });
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

it('copies the full resume link', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Copy resume link' }));
  await waitFor(() =>
    expect(writeText).toHaveBeenCalledWith(
      new URL('/builder/saved-resume-id?view=true', window.location.origin).href
    )
  );
  expect(await screen.findByText('Resume link copied.')).toBeInTheDocument();
});

it('updates the saved ID and lets Reset ID create a separate copy', async () => {
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Close' }));
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Update in Cloud' }));
  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith('/api/resumes?id=saved-resume-id', expect.any(Object))
  );
  fireEvent.click(await screen.findByRole('button', { name: 'Close' }));
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Reset ID' }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  await waitFor(() => expect(fetch).toHaveBeenLastCalledWith('/api/resumes', expect.any(Object)));
});

it('clears the cloud ID when resume data is reset', () => {
  useCloudResumeStore.getState().setId('saved-resume-id');
  resetResumeStore();
  expect(useCloudResumeStore.getState().id).toBeNull();
});

afterEach(() => vi.unstubAllEnvs());

it('saves and updates cloud resumes in production', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  expect(screen.getByRole('button', { name: 'Download to device' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Close' }));
  expect(fetch).toHaveBeenCalledWith('/api/resumes', expect.objectContaining({ method: 'POST' }));
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Update in Cloud' }));
  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith('/api/resumes?id=saved-resume-id', expect.any(Object))
  );
  expect(await screen.findByRole('button', { name: 'Close' })).toBeInTheDocument();
});

it.each(['reset', 'import'])('ignores a save completed after a resume %s', async (action) => {
  let finish!: (response: Response) => void;
  vi.mocked(fetch).mockReturnValue(
    new Promise((resolve) => {
      finish = resolve;
    })
  );
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  act(() => {
    if (action === 'reset') resetResumeStore();
    else applyImportedResumeJson({ basics: { name: 'Replacement' } });
  });
  await act(async () => {
    finish(Response.json({ id: 'stale-id' }));
  });
  expect(useCloudResumeStore.getState().id).toBeNull();
  expect(screen.queryByText('Resume saved successfully')).not.toBeInTheDocument();
  vi.mocked(fetch).mockResolvedValue(Response.json({ id: 'new-id' }));
  fireEvent.click(screen.getByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  expect(fetch).toHaveBeenLastCalledWith('/api/resumes', expect.any(Object));
  await waitFor(() => expect(useCloudResumeStore.getState().id).toBe('new-id'));
});
