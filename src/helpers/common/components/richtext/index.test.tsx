import { act, render } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { RichtextEditor } from './index';

const mocks = vi.hoisted(() => ({ make: vi.fn() }));
vi.mock('jodit', () => ({ Jodit: { make: mocks.make } }));
afterEach(() => vi.clearAllMocks());

it('removes old callbacks and destroys its instance on unmount', async () => {
  const editor = {
    value: '',
    isDestructed: false,
    destruct: vi.fn(),
    events: { on: vi.fn(), off: vi.fn() },
  };
  mocks.make.mockReturnValue(editor);
  const first = vi.fn();
  const second = vi.fn();
  const view = render(
    <RichtextEditor label="Summary" name="summary" value="Hello" onChange={first} />
  );
  await act(async () => {
    await Promise.resolve();
  });
  expect(editor.events.on).toHaveBeenCalledWith('change', first);
  view.rerender(<RichtextEditor label="Summary" name="summary" value="Hello" onChange={second} />);
  expect(editor.events.off).toHaveBeenCalledWith('change', first);
  expect(editor.events.on).toHaveBeenCalledWith('change', second);
  view.unmount();
  expect(editor.destruct).toHaveBeenCalledTimes(1);
});

it('does not create an editor after unmounting during initialization', async () => {
  const view = render(
    <RichtextEditor label="Summary" name="summary" value="" onChange={vi.fn()} />
  );
  view.unmount();
  await act(async () => {
    await Promise.resolve();
  });
  expect(mocks.make).not.toHaveBeenCalled();
});
