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
  const firstHandler = editor.events.on.mock.calls.at(-1)![1];
  firstHandler('<p style="color:red">Hello</p>');
  expect(first).toHaveBeenCalledWith('<p>Hello</p>');
  view.rerender(<RichtextEditor label="Summary" name="summary" value="Hello" onChange={second} />);
  expect(editor.events.off).toHaveBeenCalledWith('change', firstHandler);
  const secondHandler = editor.events.on.mock.calls.at(-1)![1];
  secondHandler('Updated');
  expect(second).toHaveBeenCalledWith('Updated');
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

it('cleans saved formatting and configures paste filtering', async () => {
  const editor = {
    value: '',
    isDestructed: false,
    destruct: vi.fn(),
    events: { on: vi.fn(), off: vi.fn() },
  };
  mocks.make.mockReturnValue(editor);
  const onChange = vi.fn();
  const view = render(
    <RichtextEditor
      label="Summary"
      name="summary"
      value={'<p style="color:red">Saved</p>'}
      onChange={onChange}
    />
  );
  await act(async () => {
    await Promise.resolve();
  });
  expect(editor.value).toBe('<p>Saved</p>');
  expect(onChange).toHaveBeenCalledWith('<p>Saved</p>');
  const config = mocks.make.mock.calls[0][1];
  expect(config.events.beforeSetValueToEditor()).toBeUndefined();
  expect(config.events.beforeSetValueToEditor('<p style="color:red">Saved</p>')).toBe(
    '<p>Saved</p>'
  );
  expect(
    config.events.beforePasteInsert('<p class="foreign" style="font-size:40px"><b>Bold</b></p>')
  ).toBe('<p><b>Bold</b></p>');
  view.unmount();
});
