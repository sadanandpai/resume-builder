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
  useCloudResumeStore.setState({ copiedEditCodes: {} });
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
  });
  vi.clearAllMocks();
  vi.stubGlobal(
    'fetch',
    vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'saved-resume-id', code: 'a7B2' }),
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
        new URL('/builder/saved-resume-id?mode=view', window.location.origin).href
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
    finish({ ok: true, json: async () => ({ id: 'saved-resume-id', code: 'a7B2' }) });
  });
  expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
});

it.each(['view', 'edit'])('copies the selected %s resume link', async (mode) => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText } });
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  await screen.findByRole('button', { name: 'Copy resume link' });
  fireEvent.click(
    screen.getByRole('radio', {
      name:
        mode === 'view' ? 'View only — for sharing' : 'With edit option — for returning to edit',
    })
  );
  fireEvent.click(screen.getByRole('button', { name: 'Copy resume link' }));
  await waitFor(() =>
    expect(writeText).toHaveBeenCalledWith(
      new URL(
        `/builder/saved-resume-id?mode=${mode}${mode === 'edit' ? '&code=a7B2' : ''}`,
        window.location.origin
      ).href
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
  fireEvent.click(await screen.findByRole('button', { name: 'Close anyway' }));
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Update in Cloud' }));
  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/resumes?id=saved-resume-id',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json', 'X-Resume-Code': 'a7B2' },
      })
    )
  );
  fireEvent.click(await screen.findByRole('button', { name: 'Close' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Close anyway' }));
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
  fireEvent.click(await screen.findByRole('button', { name: 'Close anyway' }));
  expect(fetch).toHaveBeenCalledWith('/api/resumes', expect.objectContaining({ method: 'POST' }));
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Update in Cloud' }));
  await waitFor(() =>
    expect(fetch).toHaveBeenLastCalledWith(
      '/api/resumes?id=saved-resume-id',
      expect.objectContaining({
        headers: { 'Content-Type': 'application/json', 'X-Resume-Code': 'a7B2' },
      })
    )
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

it('excludes importUrl while preserving other query parameters and fragments in view and edit links', async () => {
  window.history.replaceState(
    null,
    '',
    '/builder?other=one&other=two&importUrl=https%3A%2F%2Fexample.com%2Fresume.json#resume'
  );
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  const field = await screen.findByRole('textbox', { name: 'Resume link' });
  for (const mode of ['edit', 'view']) {
    fireEvent.click(
      screen.getByRole('radio', {
        name:
          mode === 'edit' ? 'With edit option — for returning to edit' : 'View only — for sharing',
      })
    );
    const url = new URL((field as HTMLInputElement).value);
    expect(url.searchParams.getAll('other')).toEqual(['one', 'two']);
    expect(url.searchParams.has('importUrl')).toBe(false);
    expect(url.searchParams.get('mode')).toBe(mode);
    expect(url.searchParams.get('code')).toBe(mode === 'edit' ? 'a7B2' : null);
    expect(url.hash).toBe('#resume');
  }
  window.history.replaceState(null, '', '/');
});

async function saveForReminder() {
  render(
    <ThemeProvider theme={GLOBAL_MUI_THEME}>
      <NavBarLayout importControllerRef={{ current: null }} />
    </ThemeProvider>
  );
  fireEvent.click(await screen.findByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Save to cloud' }));
  await screen.findByRole('dialog');
}

it('nudges after copying only a view link and can copy the edit link directly from the reminder', async () => {
  await saveForReminder();
  fireEvent.click(screen.getByRole('button', { name: 'Copy resume link' }));
  await screen.findByText('Resume link copied.');
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.getByRole('dialog', { name: 'Keep your edit link' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Copy edit link & close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  const copiedUrl = new URL(vi.mocked(navigator.clipboard.writeText).mock.calls.at(-1)![0]);
  expect(copiedUrl.searchParams.get('code')).toBe('a7B2');
  expect(copiedUrl.searchParams.get('mode')).toBe('edit');
  fireEvent.click(screen.getByRole('button', { name: /Export/ }));
  fireEvent.click(screen.getByRole('button', { name: 'Update in Cloud' }));
  fireEvent.click(await screen.findByRole('button', { name: 'Close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

it('dismisses the reminder with Escape without blocking the user', async () => {
  await saveForReminder();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  expect(await screen.findByRole('dialog', { name: 'Keep your edit link' })).toBeInTheDocument();
  fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

it('skips the reminder when the edit link has already been copied', async () => {
  await saveForReminder();
  fireEvent.click(screen.getByRole('radio', { name: 'With edit option — for returning to edit' }));
  fireEvent.click(screen.getByRole('button', { name: 'Copy resume link' }));
  await screen.findByText('Resume link copied.');
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});

it('does not count a failed copy and shows the edit link for manual copying', async () => {
  vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error('Denied'));
  await saveForReminder();
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  fireEvent.click(screen.getByRole('button', { name: 'Copy edit link & close' }));
  await screen.findByText('Could not copy the link. Please select and copy it manually.');
  const field = screen.getByRole('textbox', { name: 'Resume link' }) as HTMLInputElement;
  expect(new URL(field.value).searchParams.get('code')).toBe('a7B2');
  expect(useCloudResumeStore.getState().copiedEditCodes).toEqual({});
  fireEvent.click(screen.getByRole('button', { name: 'Close' }));
  fireEvent.click(screen.getByRole('button', { name: 'Close anyway' }));
  await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
});
