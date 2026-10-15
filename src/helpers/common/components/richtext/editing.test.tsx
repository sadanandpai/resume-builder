import { act, render, waitFor } from '@testing-library/react';
import { expect, it } from 'vitest';
import { useState } from 'react';
import { RichtextEditor } from './index';

it('retains content through real Jodit typing, toolbar commands, and controlled updates', async () => {
  function Summary() {
    const [value, setValue] = useState('<p style="color:red">Saved summary</p>');
    return (
      <>
        <RichtextEditor label="Summary" name="summary" value={value} onChange={setValue} />
        <output data-testid="saved">{value}</output>
      </>
    );
  }
  const view = render(<Summary />);
  await waitFor(() => expect(view.container.querySelector('.jodit-wysiwyg')).toBeTruthy(), {
    timeout: 10000,
  });
  const area = view.container.querySelector('.jodit-wysiwyg') as HTMLElement;
  await waitFor(() => expect(view.getByTestId('saved').textContent).toBe('<p>Saved summary</p>'));
  const { Jodit } = await import('jodit');
  const editor = Object.values(Jodit.instances)[0]!;
  await act(async () => {
    area.innerHTML = '<p>Edited summary</p>';
    editor.setEditorValue();
  });
  expect(area.textContent).toBe('Edited summary');
  expect(view.getByTestId('saved').textContent).toBe('<p>Edited summary</p>');
  await act(async () => {
    editor.s.select(area.querySelector('p')!, true);
    editor.execCommand('bold');
    editor.setEditorValue();
  });
  expect(area.textContent).toBe('Edited summary');
  expect(view.getByTestId('saved').textContent).toMatch(/<(strong|b)>Edited summary/);
  await act(async () => {
    editor.value = '<p>Another edit</p>';
    editor.setEditorValue();
  });
  expect(view.getByTestId('saved').textContent).toBe('<p>Another edit</p>');
  view.unmount();
});

it('normalizes an existing saved resume without losing sibling fields and retains edits after reload', async () => {
  const { useBasicDetails } = await import('@/stores/basic');
  const { default: BasicPanel } =
    await import('@/modules/builder/editor/modules/basic/components/BasicPanel');
  const oldValues = {
    ...useBasicDetails.getState().values,
    name: 'Existing user',
    summary: '<p style="color:red"><strong>Existing summary</strong></p>',
    objective: '<p class="pasted"><em>Existing objective</em></p>',
  };
  localStorage.setItem('basic', JSON.stringify({ state: { values: oldValues }, version: 0 }));
  await useBasicDetails.persist.rehydrate();
  function ExistingResume() {
    const values = useBasicDetails((state) => state.values);
    return (
      <BasicPanel
        activeTab={2}
        basicTabs={values}
        onChangeText={useBasicDetails.getState().reset}
      />
    );
  }
  const view = render(<ExistingResume />);
  await waitFor(
    () => {
      expect(useBasicDetails.getState().values.summary).toBe(
        '<p><strong>Existing summary</strong></p>'
      );
      expect(useBasicDetails.getState().values.objective).toBe(
        '<p><em>Existing objective</em></p>'
      );
    },
    { timeout: 10000 }
  );
  expect(useBasicDetails.getState().values.name).toBe('Existing user');
  const { Jodit } = await import('jodit');
  const editor = Object.values(Jodit.instances).find(
    (instance) => instance.editor.textContent === 'Existing summary'
  )!;
  await act(async () => {
    editor.editor.innerHTML = '<p>Updated by existing user</p>';
    editor.setEditorValue();
  });
  expect(useBasicDetails.getState().values.summary).toBe('<p>Updated by existing user</p>');
  view.unmount();
  await useBasicDetails.persist.rehydrate();
  const reloaded = render(<ExistingResume />);
  await waitFor(
    () => {
      expect(reloaded.container.querySelectorAll('.jodit-wysiwyg')).toHaveLength(2);
      expect(reloaded.container.textContent).toContain('Updated by existing user');
      expect(reloaded.container.textContent).toContain('Existing objective');
    },
    { timeout: 10000 }
  );
  expect(useBasicDetails.getState().values).toEqual({
    ...oldValues,
    summary: '<p>Updated by existing user</p>',
    objective: '<p><em>Existing objective</em></p>',
  });
  reloaded.unmount();
});
