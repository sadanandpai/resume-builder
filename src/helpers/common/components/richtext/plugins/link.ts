import type { IJodit } from 'jodit/types';
import styles from '../jodit.module.css';

const linkFormOverride = (editor: IJodit) => {
  const i18n = editor.i18n.bind(editor);

  return `<form class="jodit_form">
  <div class="${styles.jodit_form_group}">
     <label class="${styles['jodit-input-label']}" for="url">URL</label>
     <input ref="url_input" class="${
       styles.jodit_input
     }" required type="text" id="url" name="url" placeholder="http://" type="text"/>
  </div>
  <div ref="content_input_box" class="${styles.jodit_form_group}">
     <label class="${styles['jodit-input-label']}" for="text">Text</label>
     <input ref="content_input" class="${
       styles.jodit_input
     }" id="text" required name="text" placeholder="${i18n('Text')}" type="text"/>
  </div>
  <label ref="target_checkbox_box">
  <input ref="target_checkbox" class="jodit_checkbox" name="target" type="checkbox" checked/>
  <span>${i18n('Open in new tab')}</span>
  </label>
  <label ref="nofollow_checkbox_box">
  <input ref="nofollow_checkbox" class="jodit_checkbox" name="nofollow" type="checkbox" checked/>
  <span>${i18n('No follow')}</span>
  </label>
  <div class="${styles.jodit_buttons}">
     <button ref="unlink" class="${styles.jodit_button} ${
    styles.jodit_unlink_button
  }" type="button">${i18n('Unlink')}</button>
     <button ref="insert" class="${styles.jodit_button} ${
    styles.jodit_link_insert_button
  }" type="submit">${i18n('Insert')}</button>
  </div>
  <form/>`;
};

export const LinkPlugin = {
  formTemplate: linkFormOverride,
  noFollowCheckbox: false,
  openInNewTabCheckbox: false,
};
