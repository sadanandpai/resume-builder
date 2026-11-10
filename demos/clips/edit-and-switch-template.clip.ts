import { clip } from 'versioncam';

// Edits the name and the title in the Basic details panel, watches the
// resume follow, then switches to another template.
export default clip(
  'edit-and-switch-template',
  { title: 'Edit the resume and switch the template', seed: 5 },
  async (s) => {
    await s.open('/builder');
    s.caption('Edit on the right, and the resume updates as you type');
    await s.hold(1600);

    await s.click(s.byText('Basic details'));
    await s.settle();
    await s.hold(500);

    await s.click(s.byRole('textbox', { name: 'Name', exact: true }));
    await s.press('ControlOrMeta+a');
    await s.type('Mira Halloran');
    await s.settle({ label: 'name changed' });
    await s.hold(1600);

    await s.click(s.byRole('textbox', { name: 'Title', exact: true }));
    await s.press('ControlOrMeta+a');
    await s.type('Staff Engineer');
    await s.settle({ label: 'title changed' });
    await s.hold(1800);

    s.caption('Switch the template, and the content stays');
    await s.click(s.byRole('button', { name: 'Templates' }));
    await s.settle({ label: 'template menu' });
    await s.hold(1200);

    await s.click(s.byRole('img', { name: 'Spotlight' }));
    await s.settle();
    await s.press('Escape');
    await s.settle({ label: 'template switched' });
    await s.moveTo([1330, 560]);
    await s.hold(2600);
  }
);
