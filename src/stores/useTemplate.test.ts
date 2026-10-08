import { afterEach, expect, it, vi } from 'vitest';
import { restoreSavedTemplate, useTemplates } from './useTemplate';
import { AVAILABLE_TEMPLATES } from '@/helpers/constants';

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

it.each(['removed-template', '__proto__', 'constructor'])(
  'recovers from invalid saved ID %s',
  (id) => {
    localStorage.setItem('selectedTemplateId', id);
    restoreSavedTemplate();
    expect(useTemplates.getState().activeTemplate.id).toBe('modern');
  }
);
it('restores a valid saved template', () => {
  localStorage.setItem('selectedTemplateId', 'classic');
  restoreSavedTemplate();
  expect(useTemplates.getState().activeTemplate.id).toBe('classic');
});
it('supports blocked storage during hydration and selection', () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('blocked');
  });
  expect(() => restoreSavedTemplate()).not.toThrow();
  expect(() => useTemplates.getState().setTemplate(AVAILABLE_TEMPLATES.classic)).not.toThrow();
  expect(useTemplates.getState().activeTemplate.id).toBe('classic');
});
